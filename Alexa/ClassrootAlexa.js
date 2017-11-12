'use strict';


var figureList = {};
var descriptionList = {};

function getInfo(session)
{
    var figures = [
        {"first name": "Sister Mary","full name": "Sister Mary Kenneth Keller","description": "she, along with Irving Tang, was one of the first to earn a doctorate in computer science in USA"}
        ,{"first name": "Alan Turing","full name": "Alan Mathison Turing","description": "* He provided foundation of theoretical computer science, formalization of algorithm and computation with Turing machine, the model of general purpose computer"}];
        
        
    let curFigure = ''
    let curName = ''
    let curDescription = ''
    figures.forEach(function(value)
    {
        for(var key in value)
        { 
            if(key === "first name")
            {
                curName = value[key].toUpperCase();
            }
            else if(key === "full name")
            {
                curFigure = value[key].toUpperCase();
            }
            else if(key === 'description')
            {
                curDescription = value[key].toUpperCase();
            }
            if(curName !== '' && curFigure !== '')
            {
                figureList[curFigure] = curFigure;
            }
            if(curName !== '' && curDescription !== '')
            {
                descriptionList[curName] = curDescription;
            }
        
        }
    })
}


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) 
{
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) 
{
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}

function getWelcomeResponse(callback) 
{
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Welcome to Hack Holyoke 2017. How can I help you? ';
    // const speechOutput = 'How can I help you?';
 
    const repromptText = 'How can I help you? ';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) 
{
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you for trying the demo. ';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function endResponse(callback) 
{
    const cardTitle = 'Session Ended';
    const speechOutput = 'I hope that was helpful! Thank you for trying the demo. ';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}



function getCourseResponse(callback) 
{
    const sessionAttributes = {};
    const cardTitle = 'Course';
    const speechOutput = 'Which subject do you teach?';
 
    const repromptText = 'Which subject do you teach? ';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getContinuePrompt(intent, session, callback) 
{
    const sessionAttributes = {};
    const cardTitle = 'Continue';
    const speechOutput = 'What else can I help you with?';
 
    const repromptText = 'What else can I help you with? ';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}



function createCourseAttributes(course) {
    return {
        course,
    };
}

function setCourseTag(intent, session, callback) 
{
    const cardTitle = intent.name;
    const courseKeyWordSlot = intent.slots.course;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (courseKeyWordSlot) {
        const course = courseKeyWordSlot.value;
        sessionAttributes = createCourseAttributes(course);
        speechOutput = `Great! I love ${course}. It has been a huge part of my personal development.`;
    } else {
        speechOutput = "Could you repeat which subject you teach for me? ";
        
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getIdeas(intent, session, callback) 
{
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    var courseName = session.attributes.course;
    speechOutput += `How about mentioning influential figures in ${courseName} field? `;

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    
}

function getFigures(intent, session, callback) 
{
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    getInfo(session);
    speechOutput += `some of the influential figures in Computer Science are `;
    for(var key in figureList)
    {
        speechOutput += key.toLowerCase();
        speechOutput += ','
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    
}


function createNameAttributes(name) {
    return {
        name,
    };
}

function pickFigure(intent, session, callback)
{

    const cardTitle = intent.name;
    const nameKeyWordSlot = intent.slots.fname;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';
    
    if (nameKeyWordSlot) {
        const name = nameKeyWordSlot.value;
        sessionAttributes = createNameAttributes(name);
        let description = descriptionList[name.toString().toUpperCase()];
        speechOutput = description;
    } else {
        speechOutput = "Please describe your choice again";
        
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    
}


function onSessionStarted(sessionStartedRequest, session) 
{
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}


function onLaunch(launchRequest, session, callback) 
{
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);


    getWelcomeResponse(callback);
}


function onIntent(intentRequest, session, callback) 
{
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    if (intentName === 'GetHelpIntent')
    {
        getCourseResponse(callback);
    }
    else if(intentName === 'SubjectIntent')
    {
        setCourseTag(intent, session, callback);
    }
    else if (intentName === 'GetIdeasIntent') 
    {
        getIdeas(intent, session, callback);
    }
    else if (intentName === 'ContinueIntent')
    {
        getContinuePrompt(intent, session, callback);
    }
    else if (intentName === 'GetFiguresIntent') 
    {
        getFigures(intent, session, callback);
    } 
    else if (intentName === 'GetInfoIntent')
    {
        pickFigure(intent, session, callback);
    }
    else if (intentName === 'EndSessionIntent')
    {
        endResponse(callback);
    }
    else if (intentName === 'AMAZON.HelpIntent') 
    {
        getWelcomeResponse(callback);
    } 
    else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent' || intentName === 'EndIntent') 
    {
        handleSessionEndRequest(callback);
    }
    else 
    {
        throw new Error('Invalid intent');
    }
}


function onSessionEnded(sessionEndedRequest, session) 
{
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
}


exports.handler = (event, context, callback) => 
{
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') 
        {
            onLaunch(event.request,event.session,
                (sessionAttributes, speechletResponse) => 
                {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } 
        else if (event.request.type === 'IntentRequest') 
        {
            onIntent(event.request,event.session,
                (sessionAttributes, speechletResponse) => 
                {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } 
        else if (event.request.type === 'SessionEndedRequest') 
        {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } 
    catch (err) 
    {
        callback(err);
    }
};