const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Clarifai = require('clarifai');
let serviceAccount;

const models = {
  classroom: 'eeed0b6733a644cea07cf4c60f87ebb7',
  wall: 'c0c0ac362b03416da06ab3fa36fb58e3'
}

try {
  serviceAccount = require('./serviceAccountKey.json');
} catch (e) {}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://' + serviceAccount['project_id'] + '.firebaseio.com'
  });
} else {
  admin.initializeApp(functions.config().firebase);
}

const clarifai = new Clarifai.App({
  apiKey: functions.config().clarifai.api
});

function modelType(type) {
  let result = models[type.toLowerCase()];
  return (result || result.classroom);
}

function processClassroom(result) {
  const results = result['outputs'][0]['data']['colors'];
  results.forEach(element => {
    if (element['w3c']['name'].includes('Green')) {
      return {
        general: 'Plants, art works, no violence.',
        color: 'Nice balance of colors.',
        comment: 'Your classroom has some great elements! Plants and art works create a natural, comfortable atmosphere'
      }
    }
  });
  return {
    general: 'Some violence in poster, unorganized room.',
    color: 'Lack of colors.',
    comment: 'Let\'s try to aim for a neutral, welcoming classroom! Try to avoid violent images and add a few plants, pieces of art, or brighter colors overall'
  }
}

function processGender(result) {
  let female = 0;
  let male = 0;
  result.forEach((element) => {
    const gender = element['data']['face']['gender_appearance']['concepts'][0]['name'];
    (gender === 'masculine') ? male += 1: female += 1;
  });
  if (male !== female) {
    return 'It is important to to display a diverse group of techmakers. Consider improving the gender diversity.';
  }
  return 'Great job representing techmakers of all genders!';

}

function processEthnicity(result) {
  const results = {};
  result.forEach((element) => {
    const ethnicity = element['data']['face']['multicultural_appearance']['concepts'][0]['name'];
    console.log(ethnicity)
    if (results[ethnicity]) {
      results[ethnicity] += 1;
    } else {
      results[ethnicity] = 1;
    }
  });
  for (let ethnicity in results) {
    if (results[ethnicity] / result.length > 0.5) {
      return 'Your image seems to contain predominantly ' + ethnicity + ' people. Consider improving your representation of techmakers of various ethnic backgrounds.';
    }
  }
  return 'It\'s great that you\'ve represented a diverse range of influential figures. Good job!'
}

function processWall(result) {
  const results = result['outputs'][0]['data']['regions'];
  return {
    gender: processGender(results),
    ethnicity: processEthnicity(results)
  }
}

exports.analyze = functions.database.ref('/analyze/{id}').onCreate((event) => {
  const analyzeRef = admin.database().ref('/analyze');
  const uploadsRef = admin.database().ref('/uploads');
  const file = event.data.val();

  return clarifai.models.predict(modelType(file.type), file.photoUrl).then((success) => {
    analyzeRef.child(event.params.id).remove();
    uploadsRef.child(event.params.id).update({
      result: (file.type.toLowerCase() === 'classroom') ? processClassroom(success) : processWall(success)
    });
  });
});
