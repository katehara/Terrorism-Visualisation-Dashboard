

terror <- read.csv("ter.csv" , header = TRUE , fill = TRUE , row.names = NULL)
a<- count(terror , "country_txt")
b<- subset(a ,freq>500)
c<-merge(b , terror , by = "country_txt")
c<- subset(c , select = -freq)
d<- count(c , "gname")
e<- subset(d , freq>150)
f<- merge(e , c , by="gname")
f<- subset(f , select = -freq)
g<- subset(f , gname != "Unknown")
h<- subset(g , iday != 0)
write.csv(h , "terClean.csv")