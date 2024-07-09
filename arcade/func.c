#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#define MAXLEN 100
char * generateWord(){
    char word[MAXLEN] = {0};
    srand(time(NULL));
    int randomLine = rand() % 19913; //number of words in commondWords.txt
    FILE * f; 
    f = fopen("commonWords.txt", "r");
    if ( f != NULL){
        for (int i = 0; i < randomLine; i++){
            fgets(word, MAXLEN, f);
        }
    }
    char * wordCopy = malloc(sizeof(char*));

    strcpy(wordCopy, word);
    pclose(f);
    return wordCopy;
}
        