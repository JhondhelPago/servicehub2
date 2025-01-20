require('dotenv').config();
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KET
});

class StringManipulate {
    
    //static method to used in the backend logic and procedures

    static RemoveSqrBrac(str){

        const charToRemove = /\[|\]/g;
        let newstring = str.replace(charToRemove, "");

        return newstring;

    }
    
    static RemoveQuotation(str){

        const charToRemove = /\"|\"/g

        return str.replace(charToRemove, ''); 

    }

}



class DashBoardTools {
    static greet() {
        return 'hellow world';
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

  class Dashboard {

    constructor (userDataArray){
      this.user_data = userDataArray;
      this.user_data_length = this.user_data.length;
  
      this.Age = {
        minor_count : 0,
        adult_count : 0,
        senior_count : 0,
      }
  
  
      this.Gender = {
        male_count : 0,
        male_percentage : 0,
        female_percentage : 0,
        female_count : 0,
        
        MalePercentage: function(){
          this.male_percentage = (this.male_count / (this.male_count + this.female_count));
        },
  
        FemalePercentage: function(){
          this.female_percentage = (this.female_count / (this.male_count + this.female_count));
        },
  
        GetMalePercentage : function(){
          this.MalePercentage();
          return this.male_percentage ;
        },
        GetFemalePercentage : function(){
          this.FemalePercentage();
          return this.female_percentage;
        }
  
      };
  
      // this.Disability = {
      //   physical: {
      //     'Amputation': 0,
      //     'Cerebral Palsy': 0,
      //     'Spinal Cord Injury': 0,
      //     'Muscular Dystrophy': 0,
      //     'Multiple Sclerosis': 0,
      //     'Spina Bifida': 0,
      //     'Arthritis': 0,
      //     'Osteogenesis Imperfecta': 0,
      //     'Poliomyelitis (Polio)': 0,
      //     'Stroke': 0,
      //     'Traumatic Brain Injury': 0,
      //     'Dwarfism': 0,
      //     'Chronic Pain': 0,
      //     'Fibromyalgia': 0,
      //     'Lou Gehrig\'s Disease (ALS)': 0,
      //     'Parkinson\'s Disease': 0,
      //     'Myasthenia Gravis': 0,
      //     'Guillain-Barré Syndrome': 0,
      //     'Chronic Fatigue Syndrome': 0,
      //     'Scoliosis': 0,
      //     'Cerebrovascular Disease': 0,
      //     'Peripheral Neuropathy': 0,
      //     'Complex Regional Pain Syndrome (CRPS)': 0,
      //     'Ehlers-Danlos Syndrome': 0,
      //     'Ankylosing Spondylitis': 0,
      //     'Rheumatoid Arthritis': 0,
      //     'Lupus': 0,
      //     'Chronic Obstructive Pulmonary Disease (COPD)': 0,
      //     'Cystic Fibrosis': 0,
      //     'Epilepsy': 0,
      //     'Hemiplegia': 0,
      //     'Paraplegia': 0,
      //     'Quadriplegia': 0,
      //     'Visual Impairment (Blindness)': 0,
      //     'Hearing Impairment (Deafness)': 0,
      //     'Osteoporosis': 0,
      //     'Marfan Syndrome': 0,
      //     'Charcot-Marie-Tooth Disease': 0,
      //     'Huntington\'s Disease': 0,
      //     'Tuberous Sclerosis': 0,
      //     'others': 0,
      //     },
      //   mental: {
      //     'Autism Spectrum Disorder (ASD)': 0,
      //     'Attention Deficit Hyperactivity Disorder (ADHD)': 0,
      //     'Down Syndrome': 0,
      //     'Intellectual Disability': 0,
      //     'Fragile X Syndrome': 0,
      //     'Fetal Alcohol Spectrum Disorders (FASD)': 0,
      //     'Prader-Willi Syndrome': 0,
      //     'Williams Syndrome': 0,
      //     'Rett Syndrome': 0,
      //     'Angelman Syndrome': 0,
      //     'Tourette Syndrome': 0,
      //     'Dyslexia': 0,
      //     'Dyscalculia': 0,
      //     'Dysgraphia': 0,
      //     'Specific Learning Disabilities (SLD)': 0,
      //     'Developmental Coordination Disorder (DCD)': 0,
      //     'Oppositional Defiant Disorder (ODD)': 0,
      //     'Conduct Disorder': 0,
      //     'Schizophrenia': 0,
      //     'Bipolar Disorder': 0,
      //     'Major Depressive Disorder': 0,
      //     'Anxiety Disorders': 0,
      //     'Obsessive-Compulsive Disorder (OCD)': 0,
      //     'Post-Traumatic Stress Disorder (PTSD)': 0,
      //     'Borderline Personality Disorder': 0,
      //     'Antisocial Personality Disorder': 0,
      //     'Schizoaffective Disorder': 0,
      //     'Psychotic Disorders': 0,
      //     'Pervasive Developmental Disorders (PDD)': 0,
      //     'Communication Disorders': 0,
      //     'Social (Pragmatic) Communication Disorder': 0,
      //     'Selective Mutism': 0,
      //     'Reactive Attachment Disorder': 0,
      //     'Disinhibited Social Engagement Disorder': 0,
      //     'Intermittent Explosive Disorder': 0,
      //     'Neurocognitive Disorders (e.g., Dementia, Alzheimer\'s Disease)': 0,
      //     'Traumatic Brain Injury (TBI) with cognitive impairments': 0,
      //     'Huntington\'s Disease with cognitive impairments': 0,
      //     'Parkinson\'s Disease with cognitive impairments': 0,
      //     'Multiple Sclerosis with cognitive impairments': 0,
      //     'Epilepsy with cognitive impairments': 0,
      //     'Learning Disabilities': 0,
      //     'Speech and Language Disorders': 0,
      //     'Global Developmental Delay': 0,
      //     'Nonverbal Learning Disorder (NLD)': 0,
      //     'Sensory Processing Disorder (SPD)': 0,
      //     'Chronic Traumatic Encephalopathy (CTE)': 0,
      //     'Klinefelter Syndrome': 0,
      //     'Turner Syndrome': 0,
      //     'Phenylketonuria (PKU) with cognitive impairments': 0,
      //     'others': 0,
      //     }
      // };
  
      this.Disability = {
        SensoryDisability: [
          'Visual Impairment (Blindness)',
          'Hearing Impairment (Deafness)',
          'Sensory Processing Disorder (SPD)'
        ],
        SensoryDisability_count: 0,
        SensoryDisability_percentage: 0,
      
        PhysicalDisability: [
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
        PhysicalDisability_count: 0,
        PhysicalDisability_percentage: 0,
  
        MentalHealthDisability: [
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
        MentalHealthDisability_count: 0,
        MentalHealthDisability_percentage: 0,
  
        IntellectualDisability: [
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
        IntellectualDisability_count: 0,
        IntellectualDisability_percentage: 0,
  
        LearningDisability: [
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
        LearningDisability_count: 0,
        LearningDisability_percentage: 0,
  
        InvisibleDisability: [
          'Chronic Fatigue Syndrome',
          'Epilepsy',
          'Neurocognitive Disorders (e.g., Dementia, Alzheimer\'s Disease)',
          'Traumatic Brain Injury (TBI) with cognitive impairments',
          'Huntington\'s Disease with cognitive impairments',
          'Parkinson\'s Disease with cognitive impairments',
          'Multiple Sclerosis with cognitive impairments',
          'Epilepsy with cognitive impairments',
          'Chronic Traumatic Encephalopathy (CTE)'
        ],
        InvisibleDisability_count: 0,
        InvisibleDisability_percetage: 0,
  
        OtherDisability : [],
        OtherDisability_count: 0,
        OtherDisability_percentage: 0
  
  
  
  
      };
      
      // console.log(disabilities);
      
      
  
  
      this.Religion = {
        'Roman Catholicism' : 0,
        'Islam' : 0,
        'Iglesia ni Cristo' : 0,
        'Evangelical Christianity' : 0,
        'Aglipayan Church' : 0,
        'Buddhism' : 0,
        'Hinduism' : 0,
        'Judaism' : 0,
        'Jehovah\'s Witnesses' : 0,
        'Seventh-day Adventist Church' : 0,
        'Chruch of Jesus Christ of Latter-day Saints' : 0,
        'Othrodox Christianity' : 0,
        'Baha\'i Faith' : 0,
        'Taosim' : 0,
        'Animism' : 0,
  
  
  
        getReligionCount : function(){
  
          const religionList = Object.keys(this);
  
  
          let ReligionCountList = [];
  
          // religionList.forEach((religion) => {
  
          //   if(this.hasOwnProperty(religion) && typeof this[religion] !== 'function'){
          //     ReligionCountList.push(religion);
          //   }
    
          // });
  
  
  
          for(let i = 0; i < religionList.length;  i++){
  
            ReligionCountList.push([religionList[i], this[religionList[i]]])
            
  
            if(religionList[i] == 'Animism'){
              break;
            }
          }
  
          //return a list with element and count 
          return ReligionCountList;
          
  
        }
  
      };
  
  
      this.Civil = {
        'single' : 0,
        'married' : 0,
        'others' : 0,
  
  
        getSingleCount : function(){
          return this.single;
        },
        getMarriedCount : function(){
          return this.married;
        },
        getOthersCount : function(){
          return this.others;
        }
  
      };
  
      this.Employment = {
        'employed' : 0,
        'unemployed' : 0,
        'others' : 0,
  
        getEmployed : function(){
          return this.employed;
        },
        getUnemployed : function(){
          return this.unemployed;
        },
        getOthers : function(){
          return this.others;
        }
      };
  
  
  
  
      this.InitialMethod();
  
  
    }
  
  
    InitialMethod = function() {
      //how do i access tge this.userdata in this scope?
      console.log(`log from InitialMethod`)
      console.log(this.user_data.length);
  
  
      this.user_data.forEach((row_data) => {
  
  
        //checks the rows age and assigned to associated age range or category
        if(row_data.age < 18){
          this.Age.minor_count++;
        } else if (row_data.age >= 18 && row_data.age <= 59) {
          this.Age.adult_count++;
        } else{
          this.Age.senior_count++;
        }
  
  
        //check the rows gender
        if(row_data.gender.toLowerCase() == 'male'){
          this.Gender.male_count++;
        }else{
          this.Gender.female_count++;
        }
  
        //gets the religion of the row. then increment to the object thas has the same region category
        
        const religionOfThisRow = row_data.religion;
  
        this.Religion[religionOfThisRow] += 1;
  
        
  
  
        //gets the civil status of the row. then incerement the objecct that has the same civil catgegory
        const civilStatusOfThisRow = row_data.civil;
  
        this.Civil[civilStatusOfThisRow] += 1;
  
  
  
        //gets the civil status of the row. then increment the object that has the same employment category
        const employmentStatusOfThisRow = row_data.employment;
  
        this.Employment[employmentStatusOfThisRow] += 1;
  
  
        //disability checking
        // if else ladder approach
        if(this.Disability.SensoryDisability.includes(row_data.disability)){
  
          console.log(`${row_data.id} : ${row_data.disability} : Sensory`);
          this.Disability.SensoryDisability_count += 1;
  
        }else if(this.Disability.PhysicalDisability.includes(row_data.disability)){
  
          console.log(`${row_data.id} : ${row_data.disability} : Physical`);
          this.Disability.PhysicalDisability_count += 1;
  
        } else if(this.Disability.MentalHealthDisability.includes(row_data.disability)){
  
          console.log(`${row_data.id} : ${row_data.disability} : Mental`);
          this.Disability.MentalHealthDisability_count += 1;
  
        }else if(this.Disability.IntellectualDisability.includes(row_data.disability)){
  
          console.log(`${row_data.id} : ${row_data.disability} : Intellectual`);
          this.Disability.IntellectualDisability_count += 1;
  
        }else if(this.Disability.LearningDisability.includes(row_data.disability)){
  
          console.log(`${row_data.id} : ${row_data.disability} : Learning`);
          this.Disability.LearningDisability_count += 1;
  
        } else if(this.Disability.InvisibleDisability.includes(row_data.disability)){
  
          console.log(`${row_data.id} : ${row_data.disability} : Invisible`);
          this.Disability.InvisibleDisability_count += 1;
  
        }
        
      
  
        
  
     
  
      });
  
  
      //after the loop format the counted data
  
      // console.log('After the read of loop');
      
      // console.log(`Male Percentage: ${this.Gender.GetMalePercentage()}`);
      // console.log(`Female Percentage: ${this.Gender.GetFemalePercentage()}`);
      // console.log(`Religion Count List : ${this.Religion.getReligionCount()}`);
      // console.log(`Civil Count List : single=${this.Civil.getSingleCount()}, married=${this.Civil.getMarriedCount()}, others=${this.Civil.getOthersCount()}`);
      // console.log(`Employment Count: employed=${this.Employment.getEmployed()}, unemployed=${this.Employment.getUnemployed()}, others=${this.Employment.getOthers()}`);
  
  
      //assign percentage value to the Disability Property of this object
  
      this.Disability.SensoryDisability_percentage = this.Disability.SensoryDisability_count / this.user_data_length;
      
      this.Disability.PhysicalDisability_percentage = this.Disability.PhysicalDisability_count / this.user_data_length;
  
      this.Disability.MentalHealthDisability_percentage = this.Disability.MentalHealthDisability_count / this.user_data_length;
  
      this.Disability.IntellectualDisability_percentage = this.Disability.IntellectualDisability_count / this.user_data_length;
  
      this.Disability.LearningDisability_percentage = this.Disability.LearningDisability_count / this.user_data_length;
  
      this.Disability.InvisibleDisability_percentage = this.Disability.InvisibleDisability_count / this.user_data_length;
  
      //getting the missing values from the loop
  
      this.Disability.OtherDisability_count  =  this.user_data_length - 
        (
          this.Disability.SensoryDisability_count + this.Disability.PhysicalDisability_count + this.Disability.MentalHealthDisability_count + this.Disability.IntellectualDisability_count +
          this.Disability.LearningDisability_count + this.Disability.InvisibleDisability_count
        )
  
        
    }
  
  
    ReadData  = function() {
      console.log('read data operation')
  
    }
  
    DataLength = function() {
      return this.user_data.length;
    }
  
    ProcessedSelfInfo = function() {
  
      const ProcessInformation = {
        MetaInfo : {
          length : this.user_data_length
        },
  
        Age : {
          minor_count : this.Age.minor_count, 
          minor_percentage : Math.floor((this.Age.minor_count / this.user_data_length) * 100) + '%',
          adult_count : this.Age.adult_count,
          adult_percentage : Math.floor((this.Age.adult_count / this.user_data_length) * 100) + '%',
          senior_count : this.Age.senior_count,
          senior_percentage : Math.floor((this.Age.senior_count / this.user_data_length) * 100) + '%'
        },
  
        Gender : {
          male_count : this.Gender.male_count,
          female_count : this.Gender.female_count,
          // male_percentage : `${Math.floor(this.Gender.male_percentage * 100)}%` ,
          // female_percentage : `${Math.floor(this.Gender.female_percentage * 100)}%`
          male_percentage : `${Math.floor((this.Gender.male_count / this.user_data.length) * 100)}%`,
          female_percentage : `${Math.floor((this.Gender.female_count / this.user_data.length) * 100)}%`
        },
  
        // Disability : {
        //   physical : { 
        //     count : Object.keys(this.Disability.physical).map(disability_name => this.Disability.physical[disability_name]).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        //     percentage :  Object.keys(this.Disability.physical).map(disability_name => this.Disability.physical[disability_name]).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / this.user_data_length,
        //     disability : this.Disability.physical
        //   },
  
        //   mental : {
        //     count : Object.keys(this.Disability.mental).map(disabilit_name => this.Disability.mental[disabilit_name]).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        //     percentage : Object.keys(this.Disability.mental).map(disabilit_name => this.Disability.mental[disabilit_name]).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / this.user_data_length, 
        //     disability : this.Disability.mental
        //   }
        // },
  
        Disability : this.Disability,
  
        Religion : {
          'Roman Catholicism' : this.Religion['Roman Catholicism'],
          'Islam' : this.Religion['Islam'],
          'Iglesia ni Cristo' : this.Religion['Iglesia ni Cristo'],
          'Evangelical Christianity' : this.Religion['Evangelical Christianity'],
          'Aglipayan Church' : this.Religion['Aglipayan Church'],
          'Buddhism' : this.Religion['Buddhism'],
          'Hinduism' : this.Religion['Hinduism'],
          'Judaism' : this.Religion['Judaism'],
          'Jehovah\'s Witnesses' : this.Religion['Jehovah\'s Witnesses'],
          'Seventh-day Adventist Church' : this.Religion['Seventh-day Adventist Church'],
          'Chruch of Jesus Christ of Latter-day Saints' : this.Religion['Chruch of Jesus Christ of Latter-day Saints'],
          'Othrodox Christianity' : this.Religion['Othrodox Christianity'],
          'Baha\'i Faith' : this.Religion['Baha\'i Faith'],
          'Taosim' : this.Religion['Taosim'],
          'Animism' : this.Religion['Animism'],
        },
  
        Civil : {
          'single' : this.Civil.single,
          'single_percentage' : Math.floor((this.Civil.single / this.user_data_length) * 100) + '%' ,
          'married' : this.Civil.married,
          'married_percentage' : Math.floor((this.Civil.married / this.user_data_length) * 100) + '%'
        },
  
        Employment : {
          'employed' : this.Employment.employed, 
          'employment_percentage' : Math.floor((this.Employment.employed / this.user_data_length) * 100) + '%' ,
          'unemployed' : this.Employment.unemployed,
          'unemployment_percentage' : Math.floor((this.Employment.unemployed / this.user_data_length) * 100) + '%',
          'others' : this.Employment.others,
          'others_percentage' : Math.floor((this.otehrs / this.user_data_length) * 100) + '%' 
        }
  
      
      }
  
      return ProcessInformation;
  
    }
  }


module.exports = {
    StringManipulate,
    cloudinary,
    DisabilityJSON,
    Dashboard
};