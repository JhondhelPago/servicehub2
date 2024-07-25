const { DateTime } = require('luxon');

class TimeUtils {

  static _24HrTo12hr (time_string){
      const timeArray = time_string.split(':');

      const Hr = parseInt(timeArray[0]); 
      const Min = timeArray[1];
      

      let _12hr;

      let timeMark;

      if(Hr >= 12){
          timeMark = 'PM';
          _12hr =  Hr - 12 ;
      }else{
          timeMark = 'AM';
          _12hr =  Hr;
      }

      return `${_12hr.toString()}:${Min} ${timeMark}`;
  }

  static TimeNow_24HR_format (){
    const time = new Date();
    const option = {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }

    const TimeNowFormatted = time.toLocaleTimeString('en-US', option);
    const DateNow = time.toISOString().split('T')[0];;
    return {TimeNowFormatted, DateNow};
  }

}

class HotPostUtils {

  static TimeNow_24HR_format() {
    const time = new Date();
    const options = {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    const TimeNowFormatted = time.toLocaleTimeString('en-US', options);
    const DateNow = time.toISOString().split('T')[0];
    return { TimeNowFormatted, DateNow };
  }

  static HotChecker(dateString, timeString) {
    // Combine date and time strings
    const dateTimeString = `${dateString}T${timeString}`;
    
    // Parse the given date-time
    const givenDateTime = DateTime.fromISO(dateTimeString, { zone: 'Asia/Manila' });
    
    // Get the current date-time in Manila
    const now = DateTime.now().setZone('Asia/Manila');
    
    // Calculate the difference in days
    const diffInDays = now.diff(givenDateTime, 'days').days;
    
    // Check if the difference is more than 2 days

    return diffInDays < 2;
    // return 100;
  }

}
class ImageStringUtils {

  static ToArray(image_string){
      
      return image_string.split(',');
  }

  static FirstImageElement (image_string){

      return this.ToArray(image_string)[0];
  }

}



class CodeGenerator {

  static EventCodeGenerator(eventId,userId){
      const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const codeLength = 6;
      let code = '';
      
      
      for(let i = 0; i < codeLength; i++){

          code += characterSet.charAt(Math.floor(Math.random() * characterSet.length));
          
      }

      return `${eventId}-${code}-${userId}`;
  }
}



class StringManipulate {
  static ToLowerCase(string){
      return string.toLowerCase();
  }
}


function sampleEdit(props){
  // const obj_props = {title: newTitle, creator: newCreatorName};
  const obj_props = props;


  try{
      fetch('/editpost',{
          method : 'POST',
          headers : {
              'Content-Type' : 'application/json'
          },
          body : JSON.stringify(obj_props)
      });

  }catch(error){
      throw error;
  }
}

const DisabilityJSON = {
  SensoryDisabilities: [
    'Visual Impairment (Blindness)',
    'Hearing Impairment (Deafness)',
    'Sensory Processing Disorder (SPD)'
  ],

  PhysicalDisabilities: [
    'Amputation',
    'Cerebral Palsy',
    'Spinal Cord Injury',
    'Muscular Dystrophy',
    'Multiple Sclerosis',
    'Spina Bifida',
    'Arthritis',
    'Osteogenesis Imperfecta',
    'Poliomyelitis (Polio)',
    'Stroke',
    'Traumatic Brain Injury (TBI)',
    'Dwarfism',
    'Chronic Pain',
    'Fibromyalgia',
    'Lou Gehrig\'s Disease (ALS)',
    'Parkinson\'s Disease',
    'Myasthenia Gravis',
    'Guillain-Barré Syndrome',
    'Chronic Fatigue Syndrome',
    'Scoliosis',
    'Cerebrovascular Disease',
    'Peripheral Neuropathy',
    'Complex Regional Pain Syndrome (CRPS)',
    'Ehlers-Danlos Syndrome',
    'Ankylosing Spondylitis',
    'Rheumatoid Arthritis',
    'Lupus',
    'Chronic Obstructive Pulmonary Disease (COPD)',
    'Cystic Fibrosis',
    'Hemiplegia',
    'Paraplegia',
    'Quadriplegia',
    'Osteoporosis',
    'Marfan Syndrome',
    'Charcot-Marie-Tooth Disease',
    'Huntington\'s Disease',
    'Tuberous Sclerosis'
  ],

  MentalHealthDisabilities: [
    'Schizophrenia',
    'Bipolar Disorder',
    'Major Depressive Disorder',
    'Anxiety Disorders',
    'Obsessive-Compulsive Disorder (OCD)',
    'Post-Traumatic Stress Disorder (PTSD)',
    'Borderline Personality Disorder',
    'Antisocial Personality Disorder',
    'Schizoaffective Disorder',
    'Psychotic Disorders',
    'Oppositional Defiant Disorder (ODD)',
    'Conduct Disorder',
    'Selective Mutism',
    'Reactive Attachment Disorder',
    'Disinhibited Social Engagement Disorder',
    'Intermittent Explosive Disorder'
  ],

  IntellectualDisabilities: [
    'Down Syndrome',
    'Intellectual Disability',
    'Fragile X Syndrome',
    'Fetal Alcohol Spectrum Disorders (FASD)',
    'Prader-Willi Syndrome',
    'Williams Syndrome',
    'Rett Syndrome',
    'Angelman Syndrome',
    'Tourette Syndrome',
    'Global Developmental Delay',
    'Nonverbal Learning Disorder (NLD)',
    'Klinefelter Syndrome',
    'Turner Syndrome',
    'Phenylketonuria (PKU) with cognitive impairments'
  ],

  LearningDisabilities: [
    'Autism Spectrum Disorder (ASD)',
    'Attention Deficit Hyperactivity Disorder (ADHD)',
    'Dyslexia',
    'Dyscalculia',
    'Dysgraphia',
    'Specific Learning Disabilities (SLD)',
    'Developmental Coordination Disorder (DCD)',
    'Pervasive Developmental Disorders (PDD)',
    'Communication Disorders',
    'Social (Pragmatic) Communication Disorder',
    'Speech and Language Disorders'
  ],

  InvisibleDisabilities: [
    'Chronic Fatigue Syndrome',
    'Epilepsy',
    'Neurocognitive Disorders (e.g., Dementia, Alzheimer\'s Disease)',
    'Traumatic Brain Injury (TBI) with cognitive impairments',
    'Huntington\'s Disease with cognitive impairments',
    'Parkinson\'s Disease with cognitive impairments',
    'Multiple Sclerosis with cognitive impairments',
    'Epilepsy with cognitive impairments',
    'Chronic Traumatic Encephalopathy (CTE)'
  ]

};

// function isLessThanTwoDaysDifference(createdDateString, createdTimeString, nowDateString, nowTimeString) {
//   // Combine date and time strings
//   const createdDateTimeString = `${createdDateString}T${createdTimeString}`;
//   const nowDateTimeString = `${nowDateString}T${nowTimeString}`;
  
//   // Parse the given date-times
//   const createdDateTime = DateTime.fromISO(createdDateTimeString, { zone: 'Asia/Manila' });
//   const nowDateTime = DateTime.fromISO(nowDateTimeString, { zone: 'Asia/Manila' });
  
//   // Calculate the difference in days
//   const diffInDays = nowDateTime.diff(createdDateTime, 'days').days;
  
//   // Check if the difference is less than 2 days
//   return diffInDays < 2
// }

function isLessThanTwoDaysDifference(created, now) {
  const createdTime = new Date(created);
  const nowTime = new Date(now);

  const timeDifference = nowTime - createdTime;
  // return timeDifference < 2 * 24 * 60 * 60 * 1000;
  return timeDifference;
}

function convertToMilliseconds(dateString) {
  const date = new Date(dateString);
  return date.getTime();
}

function HotPostChecker(TimeCreatedStr, CurrentTimeBasedStr){

  const day_num = 2; // number of days to defined the post is new

  const msLimit = day_num * 24 * 60 * 60 * 1000;

  const ms_TimeCreatedStr = convertToMilliseconds(TimeCreatedStr);

  const ms_CurrentTimeBasedStr = convertToMilliseconds(CurrentTimeBasedStr);


  const time_diff = ms_CurrentTimeBasedStr - ms_TimeCreatedStr;
  
  return time_diff < msLimit;
  
}



module.exports = {
  TimeUtils,
  ImageStringUtils,
  CodeGenerator,
  StringManipulate,
  sampleEdit,
  DisabilityJSON,
  HotPostUtils,
  isLessThanTwoDaysDifference,
  convertToMilliseconds,
  HotPostChecker
}

