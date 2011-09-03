/*
http://cmusphinx.sourceforge.net/sphinx4/src/apps/edu/cmu/sphinx/demo/transcriber/README.html
A simple Sphinx-4 application that transcribes a continuous audio file that has multiple utterances. The audio file should contain connected digits data. The default file, called "10001-90210-01803.wav", contains three utterances, separated by silences. People who want to transcribe non-digits data should modify the config.xml file to use the correct grammar, language model, and linguist to do so. Please refer to the Programmer's Guide on how to modify the configuration file for your purposes.
*/


import edu.cmu.sphinx.decoder.Decoder
import edu.cmu.sphinx.decoder.ResultListener
import edu.cmu.sphinx.decoder.pruner.SimplePruner
import edu.cmu.sphinx.decoder.scorer.ThreadedAcousticScorer
import edu.cmu.sphinx.decoder.search.PartitionActiveListFactory
import edu.cmu.sphinx.decoder.search.SimpleBreadthFirstSearchManager
import edu.cmu.sphinx.frontend.DataBlocker
import edu.cmu.sphinx.frontend.FrontEnd
import edu.cmu.sphinx.frontend.endpoint.NonSpeechDataFilter
import edu.cmu.sphinx.frontend.endpoint.SpeechClassifier
import edu.cmu.sphinx.frontend.endpoint.SpeechMarker
import edu.cmu.sphinx.frontend.feature.DeltasFeatureExtractor
import edu.cmu.sphinx.frontend.feature.LiveCMN
import edu.cmu.sphinx.frontend.filter.Preemphasizer
import edu.cmu.sphinx.frontend.frequencywarp.MelFrequencyFilterBank
import edu.cmu.sphinx.frontend.transform.DiscreteCosineTransform
import edu.cmu.sphinx.frontend.transform.DiscreteFourierTransform
import edu.cmu.sphinx.frontend.util.AudioFileDataSource
import edu.cmu.sphinx.frontend.window.RaisedCosineWindower
import edu.cmu.sphinx.instrumentation.BestPathAccuracyTracker
import edu.cmu.sphinx.instrumentation.MemoryTracker
import edu.cmu.sphinx.instrumentation.SpeedTracker
import edu.cmu.sphinx.jsgf.JSGFGrammar
import edu.cmu.sphinx.linguist.acoustic.UnitManager
import edu.cmu.sphinx.linguist.acoustic.tiedstate.Sphinx3Loader
import edu.cmu.sphinx.linguist.acoustic.tiedstate.TiedStateAcousticModel
import edu.cmu.sphinx.linguist.dictionary.FastDictionary
import edu.cmu.sphinx.linguist.flat.FlatLinguist
import edu.cmu.sphinx.recognizer.Recognizer
import edu.cmu.sphinx.util.LogMath
import java.util.logging.Logger
import java.util.logging.Level

if (args.length < 1) {
  throw new Error("USAGE: GroovyTranscriber <sphinx4 root> [<WAV file>] [modelname] [grammarname] ")
}

def root = args[0]
def pwd = "/home/gina/Downloads/nodejs-pocketsphinxworkspace/nodejs-pocketsphinx/sphinx4files/transcriber/";

// init common 
Logger.getLogger("").setLevel(Level.WARNING)
def logMath = new LogMath(1.0001f, true)
def absoluteBeamWidth = -1
def relativeBeamWidth = 1E-80
def wordInsertionProbability = 1E-36
def languageWeight = 8.0f

// init audio data
def audioSource = new AudioFileDataSource(3200, null)
def audioURL = (args.length > 1) ?
  new File(args[1]).toURI().toURL() :
  new URL("file:" + pwd + "10001-90210-01803.wav")
audioSource.setAudioFile(audioURL, null)

def modelName;
if(args.length > 2){
  modelName = args[2];
}else{
  modelName = "tidigits";
}

def grammarName;
if(args.length > 3){
  grammarName = args[3];
}else{
  grammarName = "digits"
}

// init front end
def dataBlocker = new DataBlocker(
        10 // blockSizeMs
)
def speechClassifier = new SpeechClassifier(
        10,     // frameLengthMs,
        0.003, // adjustment,
        10,     // threshold,
        0       // minSignal
)

def speechMarker = new SpeechMarker(
        200, // startSpeechTime,
        500, // endSilenceTime,
        100, // speechLeader,
        50,  // speechLeaderFrames
        100, // speechTrailer
        15.0 // endSilenceDecay
)

def nonSpeechDataFilter = new NonSpeechDataFilter()

def premphasizer = new Preemphasizer(
        0.97 // preemphasisFactor
)
def windower = new RaisedCosineWindower(
        0.46, // double alpha
        25.625f, // windowSizeInMs
        10.0f // windowShiftInMs
)
def fft = new DiscreteFourierTransform(
        -1, // numberFftPoints
        false // invert
)
def melFilterBank = new MelFrequencyFilterBank(
        130.0, // minFreq,
        6800.0, // maxFreq,
        40 // numberFilters
)
def dct = new DiscreteCosineTransform(
        40, // numberMelFilters,
        13  // cepstrumSize
)
def cmn = new LiveCMN(
        12.0, // initialMean,
        100,  // cmnWindow,
        160   // cmnShiftWindow
)
def featureExtraction = new DeltasFeatureExtractor(
        3 // window
)

def pipeline = [
        audioSource,
        dataBlocker,
        speechClassifier,
        speechMarker,
        nonSpeechDataFilter,
        premphasizer,
        windower,
        fft,
        melFilterBank,
        dct,
        cmn,
        featureExtraction
]

def frontend = new FrontEnd(pipeline)

// init models
def unitManager = new UnitManager()

def modelLoader = new Sphinx3Loader(
        "file:" + root + "/models/acoustic/"+modelName,
        "mdef",
        "",
        logMath,
        unitManager,
        0.0f,
        1e-7f,
        0.0001f,
        true)
//want this to be wsj, it is based on the modelLoader, which is pased on the modelName so it should be okay
def model = new TiedStateAcousticModel(modelLoader, unitManager, true)

//digit recognition
def dictionary = new FastDictionary(
        new URL("file:" + root + "/models/acoustic/"+modelName+"/dict/dictionary"),
        new URL("file:" + root + "/models/acoustic/"+modelName+"/noisedict"),
        new ArrayList<URL>(),
        false,
        "<sil>",
        false,
        false,
        unitManager)

// init linguist
/*
 <component name="jsgfGrammar" type="edu.cmu.sphinx.jsapi.JSGFGrammar">
        <property name="grammarLocation" value="resource:/demo/sphinx/helloworld/"/>
        <property name="dictionary" value="dictionary"/>
        <property name="grammarName" value="hello"/>
        <property name="logMath" value="logMath"/>
    </component>
(*/
def grammar = new JSGFGrammar(
        // URL baseURL,
        new URL("file:" + pwd ), //location
        logMath, // LogMath logMath,
        grammarName, // String grammarName,
        false, // boolean showGrammar,
        false, // boolean optimizeGrammar,
        false, // boolean addSilenceWords,
        false, // boolean addFillerWords,
        dictionary // Dictionary dictionary
)
/*
Now lets look at the flatLinguist component (a component inside the searchManager). The linguist is the component that generates the search graph using the guidance from the grammar, and knowledge from the dictionary, acoustic model, and language model.
    <component name="flatLinguist" 
                type="edu.cmu.sphinx.linguist.flat.FlatLinguist">
        <property name="logMath" value="logMath"/>
        <property name="grammar" value="jsgfGrammar"/>
        <property name="acousticModel" value="wsj"/>
        <property name="wordInsertionProbability" 
                value="${wordInsertionProbability}"/>
        <property name="languageWeight" value="${languageWeight}"/>
    </component>
    */
def linguist = new FlatLinguist(
        model, // AcousticModel acousticModel,  //want this to be wsj
        logMath, // LogMath logMath,
        grammar, // Grammar grammar,
        unitManager, // UnitManager unitManager,
        wordInsertionProbability, // double wordInsertionProbability,
        1.0, // double silenceInsertionProbability,
        1.0, // double fillerInsertionProbability,
        1.0, // double unitInsertionProbability,
        languageWeight, // float languageWeight,
        false, // boolean dumpGStates,
        false, // boolean showCompilationProgress,
        false, // boolean spreadWordProbabilitiesAcrossPronunciations,
        false, // boolean addOutOfGrammarBranch,
        1.0, // double outOfGrammarBranchProbability,
        1.0, // double phoneInsertionProbability,
        null // AcousticModel phoneLoopAcousticModel
)

// init recognizer
def scorer = new ThreadedAcousticScorer(frontend, null, 10, true, 0, Thread.NORM_PRIORITY)

def pruner = new SimplePruner()

def activeListFactory = new PartitionActiveListFactory(absoluteBeamWidth, relativeBeamWidth, logMath)

def searchManager = new SimpleBreadthFirstSearchManager(
        logMath, linguist, pruner,
        scorer, activeListFactory,
        false, 0.0, 0, false)

def decoder = new Decoder(searchManager,
        false, false,
        new ArrayList<ResultListener>(),
        100000)

def recognizer = new Recognizer(decoder, null)

try{
    // allocate the resourcs necessary for the recognizer
    recognizer.allocate()
} catch (Exception e) {
    println(e)
    e.printStackTrace();
}

// Loop unitl last utterance in the audio file has been decoded, in which case the recognizer will return null.
def result
while ((result = recognizer.recognize()) != null) {
  def resultText = result.getBestResultNoFiller()
  println(resultText)
}