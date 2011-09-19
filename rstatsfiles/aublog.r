#create labels for plots
articulationlabel <- "Articulation rate (syl/phonation)"
labparticipantslabel <- "Lab Participants"
bloggingpodcasterslabel <- "Blogging Podcasters"
nusableparticipants <- "(n=5)"
nallparticipants <- "(n=12)"


#read in data
aublog <- read.table("/Users/gina/Documents/aublog/results/resultsboxplotformat.csv", header=TRUE, sep="," )
aublogall <- read.table("/Users/gina/Documents/aublog/results/results.csv", header=TRUE, sep="," )

# histogram for all lab participant aritculation rate
pdf("/Users/gina/Documents/aublog/results/histogramalllab.pdf",width=6,height=6,paper='special')
x <- aublogall$artirate
title <-paste(labparticipantslabel,nallparticipants, sep = " ", collapse = NULL)
h<-hist(x, breaks=10, col="red", xlab=articulationlabel, yaxt="n",
  	 main=title) 
xfit<-seq(min(x),max(x),length=40) 
yfit<-dnorm(xfit,mean=mean(x),sd=sd(x)) 
yfit <- yfit*diff(h$mids[1:2])*length(x) 
lines(xfit, yfit, col="blue", lwd=2)
dev.off()

#Box plot comparing articulation rate in the two blog drafts
# http://www.statmethods.net/graphs/boxplot.html
pdf("/Users/gina/Documents/aublog/results/boxplotusablelab.pdf",width=6,height=6,paper='special')
title <-paste(labparticipantslabel,nusableparticipants,"p = 0.2662", sep = " ", collapse = NULL)
boxplot(artirate~draft,data=aublog, notch=TRUE, col=(c("red","darkgreen")), main=title,  xlab="(Insignificant Tendency for faster syllable timing in second Blog Draft)", ylab=articulationlabel)
dev.off()

#boxplot(phonationtime~draft,data=aublog, main=title,  xlab="Blog Draft", ylab=articulationlabel)
#boxplot(nsyll~draft,data=aublog, main=title,  xlab="Blog Draft", ylab=articulationlabel)
#boxplot(speechrate~draft,data=aublog, main=title,  xlab="Blog Draft", ylab=articulationlabel)


#Compaire groups via kernal density
pdf("/Users/gina/Documents/aublog/results/densityusablelab.pdf",width=6,height=6,paper='special')
title <-paste(labparticipantslabel,"density distribution",nusableparticipants, sep = " ", collapse = NULL)
sm.density.compare(aublog$artirate, aublog$draft, xlab=articulationlabel) 
title(main=title)
# add legend via mouse click
drafts.f <- factor(aublog$draft, levels= c(1,2), labels = c("1st Draft","2nd Draft"))
colfill<-c(2:(2+length(levels(drafts.f))))
#legend(locator(1), levels(drafts.f), fill=colfill)
legend("topright", levels(drafts.f), fill=colfill)

dev.off()



#skeptoid histogram
skeptoid <- read.table("/Users/gina/Documents/aublog/results/praatresultsskeptoid.csv", header=TRUE, sep="," )
pdf("/Users/gina/Documents/aublog/results/histogrambloggingpodcasters.pdf",width=6,height=6,paper='special')
x <- skeptoid$artirate
title <-paste(bloggingpodcasterslabel,"(n=47)", sep = " ", collapse = NULL)
h<-hist(x, breaks=10, col="red", xlab=articulationlabel, yaxt="n",
     main=title)
xfit<-seq(min(x),max(x),length=40)
yfit<-dnorm(xfit,mean=mean(x),sd=sd(x))
yfit <- yfit*diff(h$mids[1:2])*length(x)
lines(xfit, yfit, col="blue", lwd=2)
dev.off()




#Paired t-test insignificant (too small sample size and too much variance): test Hypothesis1 that draft1 has slower articulation rate than draft2
aublogttest <- read.table("/Users/gina/Documents/aublog/results/resultsttestarticulationrate.csv", header=TRUE, sep="," )

t.test(aublogttest$draft1,aublogttest$draft2,paired=TRUE, alt="less")


	Paired t-test

data:  aublogttest$draft1 and aublogttest$draft2 
t = -0.6826, df = 4, p-value = 0.2662
alternative hypothesis: true difference in means is less than 0 
95 percent confidence interval:
      -Inf 0.3057439 
sample estimates:
mean of the differences 
                 -0.144 



#Compare all participant data to skeptoid

 t.test(aublogall$artirate,skeptoid$artirate)

	Welch Two Sample t-test

data:  articulationrate and skeptoid$artirate 
t = -6.0765, df = 21.333, p-value = 4.649e-06
alternative hypothesis: true difference in means is not equal to 0 
95 percent confidence interval:
 -1.2350082 -0.6056605 
sample estimates:
mean of x mean of y 
 4.002857  4.923191 
