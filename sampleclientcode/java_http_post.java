import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.ArrayList;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;

   
    /*
     * required private variables for sample method
     */
    private String mAudioFilePath;
    private String mFileNameOnServer;
    
    
    /*
     * Sample method
     */
    public String uploadToServer(){
    	try {
			HttpClient httpClient = new DefaultHttpClient();
			HttpContext localContext = new BasicHttpContext();
			Long uniqueId = System.currentTimeMillis();
			HttpPost httpPost = new HttpPost(NonPublicConstants.NONPUBLIC_TRANSCRIPTION_WEBSERVICE_URL+"stuff"+uniqueId.toString());

			MultipartEntity entity = new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE);
			File audioFile = new File(mAudioFilePath);
			entity.addPart("title", new StringBody("thetitle"));
			entity.addPart("file", new FileBody(audioFile));
			httpPost.setEntity(entity);
			
			HttpResponse response = httpClient.execute(httpPost,localContext);
			
      /*
       * read response line by line
       */
			BufferedReader reader = new BufferedReader(
					new InputStreamReader(
							response.getEntity().getContent(), "UTF-8"));

			String sResponse = reader.readLine();
			reader.readLine(); //eat the line with the filename
      mFileNameOnServer = reader.readLine().replaceAll(":path","");
        	
			return sResponse;
		} catch (Exception e) {
			
			return null;
		}
    	
    }
