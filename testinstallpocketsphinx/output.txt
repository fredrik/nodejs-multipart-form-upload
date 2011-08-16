 l$ gcc -o hello_ps hello_ps.c -DMODELDIR=\"`pkg-config --variable=modeldir pocketsphinx`\" `pkg-config --cflags --libs pocketsphinx sphinxbase`
 gina@tower110103:~/Downloads/pocketsphinx/testinstall$ ls
 goforward.raw  hello_ps  hello_ps.c
 gina@tower110103:~/Downloads/pocketsphinx/testinstall$ ./hello_ps 
 INFO: cmd_ln.c(691): Parsing command line:
 \
 	-hmm /usr/local/share/pocketsphinx/model/hmm/en_US/hub4wsj_sc_8k \
 	-lm /usr/local/share/pocketsphinx/model/lm/en/turtle.DMP \
 	-dict /usr/local/share/pocketsphinx/model/lm/en/turtle.dic 
 
 Current configuration:
 [NAME]		[DEFLT]		[VALUE]
 -agc		none		none
 -agcthresh	2.0		2.000000e+00
 -alpha		0.97		9.700000e-01
 -ascale		20.0		2.000000e+01
 -aw		1		1
 -backtrace	no		no
 -beam		1e-48		1.000000e-48
 -bestpath	yes		yes
 -bestpathlw	9.5		9.500000e+00
 -bghist		no		no
 -ceplen		13		13
 -cmn		current		current
 -cmninit	8.0		8.0
 -compallsen	no		no
 -debug				0
 -dict				/usr/local/share/pocketsphinx/model/lm/en/turtle.dic
 -dictcase	no		no
 -dither		no		no
 -doublebw	no		no
 -ds		1		1
 -fdict				
 -feat		1s_c_d_dd	1s_c_d_dd
 -featparams			
 -fillprob	1e-8		1.000000e-08
 -frate		100		100
 -fsg				
 -fsgusealtpron	yes		yes
 -fsgusefiller	yes		yes
 -fwdflat	yes		yes
 -fwdflatbeam	1e-64		1.000000e-64
 -fwdflatefwid	4		4
 -fwdflatlw	8.5		8.500000e+00
 -fwdflatsfwin	25		25
 -fwdflatwbeam	7e-29		7.000000e-29
 -fwdtree	yes		yes
 -hmm				/usr/local/share/pocketsphinx/model/hmm/en_US/hub4wsj_sc_8k
 -input_endian	little		little
 -jsgf				
 -kdmaxbbi	-1		-1
 -kdmaxdepth	0		0
 -kdtree				
 -latsize	5000		5000
 -lda				
 -ldadim		0		0
 -lextreedump	0		0
 -lifter		0		0
 -lm				/usr/local/share/pocketsphinx/model/lm/en/turtle.DMP
 -lmctl				
 -lmname		default		default
 -logbase	1.0001		1.000100e+00
 -logfn				
 -logspec	no		no
 -lowerf		133.33334	1.333333e+02
 -lpbeam		1e-40		1.000000e-40
 -lponlybeam	7e-29		7.000000e-29
 -lw		6.5		6.500000e+00
 -maxhmmpf	-1		-1
 -maxnewoov	20		20
 -maxwpf		-1		-1
 -mdef				
 -mean				
 -mfclogdir			
 -min_endfr	0		0
 -mixw				
 -mixwfloor	0.0000001	1.000000e-07
 -mllr				
 -mmap		yes		yes
 -ncep		13		13
 -nfft		512		512
 -nfilt		40		40
 -nwpen		1.0		1.000000e+00
 -pbeam		1e-48		1.000000e-48
 -pip		1.0		1.000000e+00
 -pl_beam	1e-10		1.000000e-10
 -pl_pbeam	1e-5		1.000000e-05
 -pl_window	0		0
 -rawlogdir			
 -remove_dc	no		no
 -round_filters	yes		yes
 -samprate	16000		1.600000e+04
 -seed		-1		-1
 -sendump			
 -senlogdir			
 -senmgau			
 -silprob	0.005		5.000000e-03
 -smoothspec	no		no
 -svspec				
 -tmat				
 -tmatfloor	0.0001		1.000000e-04
 -topn		4		4
 -topn_beam	0		0
 -toprule			
 -transform	legacy		legacy
 -unit_area	yes		yes
 -upperf		6855.4976	6.855498e+03
 -usewdphones	no		no
 -uw		1.0		1.000000e+00
 -var				
 -varfloor	0.0001		1.000000e-04
 -varnorm	no		no
 -verbose	no		no
 -warp_params			
 -warp_type	inverse_linear	inverse_linear
 -wbeam		7e-29		7.000000e-29
 -wip		0.65		6.500000e-01
 -wlen		0.025625	2.562500e-02
 
 INFO: cmd_ln.c(691): Parsing command line:
 \
 	-nfilt 20 \
 	-lowerf 1 \
 	-upperf 4000 \
 	-wlen 0.025 \
 	-transform dct \
 	-round_filters no \
 	-remove_dc yes \
 	-svspec 0-12/13-25/26-38 \
 	-feat 1s_c_d_dd \
 	-agc none \
 	-cmn current \
 	-cmninit 56,-3,1 \
 	-varnorm no 
 
 Current configuration:
 [NAME]		[DEFLT]		[VALUE]
 -agc		none		none
 -agcthresh	2.0		2.000000e+00
 -alpha		0.97		9.700000e-01
 -ceplen		13		13
 -cmn		current		current
 -cmninit	8.0		56,-3,1
 -dither		no		no
 -doublebw	no		no
 -feat		1s_c_d_dd	1s_c_d_dd
 -frate		100		100
 -input_endian	little		little
 -lda				
 -ldadim		0		0
 -lifter		0		0
 -logspec	no		no
 -lowerf		133.33334	1.000000e+00
 -ncep		13		13
 -nfft		512		512
 -nfilt		40		20
 -remove_dc	no		yes
 -round_filters	yes		no
 -samprate	16000		1.600000e+04
 -seed		-1		-1
 -smoothspec	no		no
 -svspec				0-12/13-25/26-38
 -transform	legacy		dct
 -unit_area	yes		yes
 -upperf		6855.4976	4.000000e+03
 -varnorm	no		no
 -verbose	no		no
 -warp_params			
 -warp_type	inverse_linear	inverse_linear
 -wlen		0.025625	2.500000e-02
 
 INFO: acmod.c(242): Parsed model-specific feature parameters from /usr/local/share/pocketsphinx/model/hmm/en_US/hub4wsj_sc_8k/feat.params
 INFO: feat.c(684): Initializing feature stream to type: '1s_c_d_dd', ceplen=13, CMN='current', VARNORM='no', AGC='none'
 INFO: cmn.c(142): mean[0]= 12.00, mean[1..12]= 0.0
 INFO: acmod.c(163): Using subvector specification 0-12/13-25/26-38
 INFO: mdef.c(520): Reading model definition: /usr/local/share/pocketsphinx/model/hmm/en_US/hub4wsj_sc_8k/mdef
 INFO: mdef.c(531): Found byte-order mark BMDF, assuming this is a binary mdef file
 INFO: bin_mdef.c(330): Reading binary model definition: /usr/local/share/pocketsphinx/model/hmm/en_US/hub4wsj_sc_8k/mdef
 INFO: bin_mdef.c(507): 50 CI-phone, 143047 CD-phone, 3 emitstate/phone, 150 CI-sen, 5150 Sen, 27135 Sen-Seq
 INFO: tmat.c(205): Reading HMM transition probability matrices: /usr/local/share/pocketsphinx/model/hmm/en_US/hub4wsj_sc_8k/transition_matrices
 INFO: acmod.c(117): Attempting to use SCHMM computation module
 INFO: ms_gauden.c(198): Reading mixture gaussian parameter: /usr/local/share/pocketsphinx/model/hmm/en_US/hub4wsj_sc_8k/means
 INFO: ms_gauden.c(292): 1 codebook, 3 feature, size: 
 INFO: ms_gauden.c(294):  256x13
 INFO: ms_gauden.c(294):  256x13
 INFO: ms_gauden.c(294):  256x13
 INFO: ms_gauden.c(198): Reading mixture gaussian parameter: /usr/local/share/pocketsphinx/model/hmm/en_US/hub4wsj_sc_8k/variances
 INFO: ms_gauden.c(292): 1 codebook, 3 feature, size: 
 INFO: ms_gauden.c(294):  256x13
 INFO: ms_gauden.c(294):  256x13
 INFO: ms_gauden.c(294):  256x13
 INFO: ms_gauden.c(354): 0 variance values floored
 INFO: s2_semi_mgau.c(908): Loading senones from dump file /usr/local/share/pocketsphinx/model/hmm/en_US/hub4wsj_sc_8k/sendump
 INFO: s2_semi_mgau.c(932): BEGIN FILE FORMAT DESCRIPTION
 INFO: s2_semi_mgau.c(1027): Using memory-mapped I/O for senones
 INFO: s2_semi_mgau.c(1304): Maximum top-N: 4 Top-N beams: 0 0 0
 INFO: dict.c(306): Allocating 4217 * 32 bytes (131 KiB) for word entries
 INFO: dict.c(321): Reading main dictionary: /usr/local/share/pocketsphinx/model/lm/en/turtle.dic
 INFO: dict.c(212): Allocated 0 KiB for strings, 0 KiB for phones
 INFO: dict.c(324): 110 words read
 INFO: dict.c(330): Reading filler dictionary: /usr/local/share/pocketsphinx/model/hmm/en_US/hub4wsj_sc_8k/noisedict
 INFO: dict.c(212): Allocated 0 KiB for strings, 0 KiB for phones
 INFO: dict.c(333): 11 words read
 INFO: dict2pid.c(396): Building PID tables for dictionary
 INFO: dict2pid.c(404): Allocating 50^3 * 2 bytes (244 KiB) for word-initial triphones
 INFO: dict2pid.c(131): Allocated 60400 bytes (58 KiB) for word-final triphones
 INFO: dict2pid.c(195): Allocated 60400 bytes (58 KiB) for single-phone word triphones
 INFO: ngram_model_arpa.c(77): No \data\ mark in LM file
 INFO: ngram_model_dmp.c(142): Will use memory-mapped I/O for LM file
 INFO: ngram_model_dmp.c(196): ngrams 1=91, 2=212, 3=177
 INFO: ngram_model_dmp.c(242):       91 = LM.unigrams(+trailer) read
 INFO: ngram_model_dmp.c(291):      212 = LM.bigrams(+trailer) read
 INFO: ngram_model_dmp.c(317):      177 = LM.trigrams read
 INFO: ngram_model_dmp.c(342):       20 = LM.prob2 entries read
 INFO: ngram_model_dmp.c(362):       12 = LM.bo_wt2 entries read
 INFO: ngram_model_dmp.c(382):       12 = LM.prob3 entries read
 INFO: ngram_model_dmp.c(410):        1 = LM.tseg_base entries read
 INFO: ngram_model_dmp.c(466):       91 = ascii word strings read
 INFO: ngram_search_fwdtree.c(99): 67 unique initial diphones
 INFO: ngram_search_fwdtree.c(147): 0 root, 0 non-root channels, 15 single-phone words
 INFO: ngram_search_fwdtree.c(186): Creating search tree
 INFO: ngram_search_fwdtree.c(191): before: 0 root, 0 non-root channels, 15 single-phone words
 INFO: ngram_search_fwdtree.c(326): after: max nonroot chan increased to 328
 INFO: ngram_search_fwdtree.c(338): after: 67 root, 200 non-root channels, 14 single-phone words
 INFO: ngram_search_fwdflat.c(156): fwdflat: min_ef_width = 4, max_sf_win = 25
 INFO: cmn.c(175): CMN: 37.32 -0.91  0.57  0.52 -0.62  0.13 -0.06  0.28  0.39  0.59  0.12 -0.16  0.18 
 INFO: ngram_search_fwdtree.c(1549):     2000 words recognized (7/fr)
 INFO: ngram_search_fwdtree.c(1551):   140003 senones evaluated (502/fr)
 INFO: ngram_search_fwdtree.c(1553):    67926 channels searched (243/fr), 17687 1st, 27508 last
 INFO: ngram_search_fwdtree.c(1557):     4342 words for which last channels evaluated (15/fr)
 INFO: ngram_search_fwdtree.c(1560):     4207 candidate words for entering last phone (15/fr)
 INFO: ngram_search_fwdtree.c(1562): fwdtree 0.04 CPU 0.014 xRT
 INFO: ngram_search_fwdtree.c(1565): fwdtree 0.03 wall 0.010 xRT
 INFO: ngram_search_fwdflat.c(305): Utterance vocabulary contains 24 words
 INFO: ngram_search_fwdflat.c(940):      535 words recognized (2/fr)
 INFO: ngram_search_fwdflat.c(942):    47071 senones evaluated (169/fr)
 INFO: ngram_search_fwdflat.c(944):    37023 channels searched (132/fr)
 INFO: ngram_search_fwdflat.c(946):     2159 words searched (7/fr)
 INFO: ngram_search_fwdflat.c(948):     1551 word transitions (5/fr)
 INFO: ngram_search_fwdflat.c(951): fwdflat 0.00 CPU 0.000 xRT
 INFO: ngram_search_fwdflat.c(954): fwdflat 0.01 wall 0.004 xRT
 INFO: ngram_search.c(1253): lattice start node <s>.0 end node </s>.213
 INFO: ngram_search.c(1281): Eliminated 0 nodes before end node
 INFO: ngram_search.c(1386): Lattice has 70 nodes, 21 links
 INFO: ps_lattice.c(1352): Normalizer P(O) = alpha(</s>:213:277) = -1409852
 INFO: ps_lattice.c(1390): Joint P(O,S) = -1409968 P(S|O) = -116
 INFO: ngram_search.c(875): bestpath 0.00 CPU 0.000 xRT
 INFO: ngram_search.c(878): bestpath 0.00 wall 0.000 xRT
 Recognized: go forward ten meters
 INFO: cmn_prior.c(121): cmn_prior_update: from < 37.32 -0.91  0.57  0.52 -0.62  0.13 -0.06  0.28  0.39  0.59  0.12 -0.16  0.18 >
 INFO: cmn_prior.c(139): cmn_prior_update: to   < 37.32 -0.91  0.57  0.52 -0.62  0.13 -0.06  0.28  0.39  0.59  0.12 -0.16  0.18 >
 INFO: ngram_search_fwdtree.c(1549):     2000 words recognized (7/fr)
 INFO: ngram_search_fwdtree.c(1551):   140208 senones evaluated (503/fr)
 INFO: ngram_search_fwdtree.c(1553):    67926 channels searched (243/fr), 17687 1st, 27508 last
 INFO: ngram_search_fwdtree.c(1557):     4342 words for which last channels evaluated (15/fr)
 INFO: ngram_search_fwdtree.c(1560):     4207 candidate words for entering last phone (15/fr)
 INFO: ngram_search_fwdtree.c(1562): fwdtree 0.04 CPU 0.014 xRT
 INFO: ngram_search_fwdtree.c(1565): fwdtree 0.03 wall 0.010 xRT
 INFO: ngram_search_fwdflat.c(305): Utterance vocabulary contains 24 words
 INFO: ngram_search_fwdflat.c(940):      535 words recognized (2/fr)
 INFO: ngram_search_fwdflat.c(942):    47071 senones evaluated (169/fr)
 INFO: ngram_search_fwdflat.c(944):    37023 channels searched (132/fr)
 INFO: ngram_search_fwdflat.c(946):     2159 words searched (7/fr)
 INFO: ngram_search_fwdflat.c(948):     1551 word transitions (5/fr)
 INFO: ngram_search_fwdflat.c(951): fwdflat 0.00 CPU 0.000 xRT
 INFO: ngram_search_fwdflat.c(954): fwdflat 0.01 wall 0.004 xRT
 INFO: ngram_search.c(1253): lattice start node <s>.0 end node </s>.213
 INFO: ngram_search.c(1281): Eliminated 0 nodes before end node
 INFO: ngram_search.c(1386): Lattice has 70 nodes, 21 links
 INFO: ps_lattice.c(1352): Normalizer P(O) = alpha(</s>:213:277) = -1409852
 INFO: ps_lattice.c(1390): Joint P(O,S) = -1409968 P(S|O) = -116
 INFO: ngram_search.c(875): bestpath 0.00 CPU 0.000 xRT
 INFO: ngram_search.c(878): bestpath 0.00 wall 0.000 xRT
 Recognized: go forward ten meters
 INFO: ngram_search_fwdtree.c(430): TOTAL fwdtree 0.08 CPU 0.014 xRT
 INFO: ngram_search_fwdtree.c(433): TOTAL fwdtree 0.06 wall 0.010 xRT
 INFO: ngram_search_fwdflat.c(174): TOTAL fwdflat 0.00 CPU 0.000 xRT
 INFO: ngram_search_fwdflat.c(177): TOTAL fwdflat 0.02 wall 0.004 xRT
 INFO: ngram_search.c(317): TOTAL bestpath 0.00 CPU 0.000 xRT
 INFO: ngram_search.c(320): TOTAL bestpath 0.00 wall 0.000 xRT
 gina@tower110103:~/Downloads/pocketsphinx/testinstall$ pl
 pl2pm               pltotf              plymouthd
 plipconfig          pluginappletviewer  
 plog                plymouth            
 gina@tower110103:~/Downloads/pocketsphinx/testinstall$ 
 
