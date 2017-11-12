from clarifai.rest import ClarifaiApp
from clarifai.rest import Image as ClImage
from firebase import firebase
import json
from collections import Counter

firebase = firebase.FirebaseApplication('https://classroot-tech.firebaseio.com/', None)
image_folder = '/Users/simon/documents/HackHolyoke Fall 2017/picture/'
app = ClarifaiApp(api_key='e8f0c3f89414418b8a4247590945c9f1')
imagePath_wall = image_folder + 'Picnik collage.jpg'
imagePath_class_good = image_folder + 'good from study.jpg'
imagePath_class_bad = image_folder + 'bad from study.jpg'

image_wall = ClImage(file_obj = open(imagePath_wall,'rb'))
image_good = ClImage(file_obj = open(imagePath_class_good,'rb'))
image_bad = ClImage(file_obj = open(imagePath_class_bad,'rb'))

#color
model_col = app.models.get('eeed0b6733a644cea07cf4c60f87ebb7')
#demographic
model_dem = app.models.get('c0c0ac362b03416da06ab3fa36fb58e3')

def analyzeClass(image):
    tok = processColor(image)
    if tok == "good":
        goodResult()
    else:
        badResult()

def goodResult():
    general = "plants, art works, no violence"
    color = "nice balance of colors"
    comment = "Your classroom has some great elements! Plants and art works create a natural, comfortable atmosphere"
    print(comment)
    #turn into json and submit to classroom result

def badResult():
    general = "some violence in poster, unorganized room"
    color = "lack of colors"
    comment = "Let's try to aim for a neutral, welcoming classroom! Try to avoid violent images and add few plants, artworks, and/or brighter colors overall"
    print(comment)
    #turn into json and submit to classroom result


def processColor(image):
    colors = []
    result = model_col.predict([image])
    result = result['outputs'][0]['data']['colors']
    num_color = len(result)
    for i in range(0, num_color):
        colors.append(result[i]['w3c']['name'])
    for str in colors:
        if 'Green' in str:
            return("good")
    return("bad")

def processDemographic(image):
    result = model_dem.predict([image])
    result = result['outputs'][0]['data']['regions']
    gender_res =  processGender(result)
    ethn_res = processEthn(result)
    #turn into json and submit to wall result

def processGender(result):
    gender = []
    male = 0
    female = 0
    num_people = len(result)
    for i in range(0, num_people):
        gender.append(result[i]['data']['face']['gender_appearance']['concepts'][0]['name'])
    for i in range(0, num_people):
        tok = gender[i]
        if tok == 'masculine':
            male = male + 1
        else:
            female = female + 1
    if male > female:
        return('consider adding more feminine figures')
    elif male < female:
        return('consider adding more masculine figures')
    else:
        return('good job!')

def processEthn(result):
    ethn = []
    num_people = len(result)
    for i in range(0, num_people):
        ethn.append(result[i]['data']['face']['multicultural_appearance']['concepts'][0]['name'])
    ethnList = dict((i, ethn.count(i)) for i in ethn)
    for k, v in ethnList.items():
        if(v/num_people) > 0.5:
            return("Your image seems to contain predominantly " + k + " people. Maybe consider adding more varieties of ethnic backgrounds!")
    return("It’s great that you’ve represented a diverse range of influential figures. Good job!")

#processDemographic(image_wall)
analyzeClass(image_good)
