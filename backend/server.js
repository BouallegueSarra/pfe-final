const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const {Etudiant} =require('./models/etudiant'); 
const {User} =require('./models/user');
const {Professeur} =require('./models/professeur');
const {Admin} =require('./models/admin');
const {Test} =require('./models/test');
var dateFormat = require('dateformat');

const multer=require('multer'); 

const cors =require('cors');
const bcrypt =require('bcrypt');
const { Cours } = require('./models/cours');
const { Section } = require('./models/section');
const { Certificat } = require('./models/certificat');
const { Contact } = require('./models/contact');
const { Reponse } = require('./models/reponse');
const { ParametreTest } = require('./models/parametreTest');
const { Reclamation } = require('./models/reclamation');

const app = express();
app.use(bodyParser.json()); // bch ynajem ya9ra les requetes eli nab3ethhom men body 
app.use(bodyParser.urlencoded ({extended:false})); // bch yeviti la8lat eli f requete w yefhem body chnaaya feha 

app.use(cors());


//***********Inscription****************


app.post('/addEtudiant',  function regis(req, res, callback){
    var etud = req.body; 
    Etudiant.findOne({email : etud.email}, (error,users)=>{

   if (error){console.log(error);}
   else {
    if(users){ 
        res.status(401).send("L'adresse email est incorrect ");    }
    else { 
        var etudiant = new Etudiant(etud); 
        const passwordcrypte = bcrypt.hashSync(etudiant.mot_passe, 8);
        etudiant.mot_passe = passwordcrypte; 
        etudiant.save().then(
            (savedEtudiant)=>{ 
                
                let payload={subject : savedEtudiant._id};
                let token =jwt.sign(payload, 'token');
                res.send({token: token , id:savedEtudiant._id});
                return callback (savedEtudiant._id); 
             })
    }
}})})


// 1/FristLoginEtudiant:true
// --> Login // EditProfile
// -->Upload Image // ID--> localstorage.getitem....id
// -->Save-->FristLoginEtudiant:false
// -->model/etudiant/Image
// -->RouterLINK'Dashboard'
// -->LogOut
// -->Login
// -->Dashboard----(FristLoginEtudiant:flase)


    //*********** upload image *******/
// const storage =multer.diskStorage({
//     destination:'./+CourseID+/', 
//     filename : function (req, file, cb){
//     cb( null,'lllll.'+file.mimetype.split('/')[1])}
// })

// const upload = multer({storage: storage})

// app.post('/', upload.single('file'),(req, res)=>{})



// function photo(id){

//  const storage =multer.diskStorage({
    
//      destination:'../front-etudiant/src/assets/imageProfil/', 

//      filename : function (req, file, cb){
//      cb( null,id+'frregr.'+file.mimetype.split('/')[1])}
//  })
//  return storage; 
//  console.log("rgrgergergerg", storage);
// }
// const upload = multer({storage: photo(), id})



// app.post('/upload/:id', upload.single('file'),id,(req, res)=>{
//     var id=req.params.id;
// console.log("emfeel  " , id );
// photo(id);
  
// })




//********** upload image profil *************** */

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../front-etudiant/src/assets/imageProfil/');
    },
    filename: (req, file, cb) => {
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      var day=dateFormat(new Date(), "yyyymmddHHMMss");
      cb(null, req.params.id+day + '.' + filetype);

    }
});

var upload = multer({storage: storage});
app.post('/upload/:id', upload.single('file'), function(req, res) {

});





//***********login****************
app.post('/login', (req,res)=>{
    var use = req.body;
  User.findOne({email : use.email}, (error,users)=>{
      
      if (error){
        console.log(error);
    } else {
       if  (!users) {
            res.status(400).send("L'adresse email est incorrect");  
        }
        else
         if (!bcrypt.compareSync(use.mot_passe, users.mot_passe)){ //
            res.status(400).send("Le mot de passe est incorrect");    }
            else {
            let payload={subject : (users._id, users.role)};
            let token =jwt.sign(payload, 'token');
           
         
            res.status(200).send({ role: users.role, id: users._id , token : token });
            
        }
    }
}

)

});




//***********Reset password****************

app.post('/reset', (req,res)=>{

User.findOne({email : req.body.email}, (error,users)=>{

    if (error){
        console.log(error);
    } else {
       if  (!users) {
            res.status(401).send("L'adresse email est incorrect");
        }
        else {
            let mdp = Math.random().toString(36).substr(2, 10); // saisir une chaine aléatoire
            User.findOne({mot_passe : mdp}, (error,users)=>{   // bch ycherchi 3al mot passe mawjoud f table user wala nn  
                if(error){ console.log(error);}
                else {
                  console.log("random", mdp);
                  res.status(200).send({mdp});
                }
            })
        }
    }})})
    
app.get('/getOne/:id',(req,res)=>{
        var id=req.params.id;
        User.findOne({_id: id}).then(
            (OneEtudiant)=>{
                res.send(OneEtudiant); 
                },
            (err)=>{console.log(err);}
            );
     });
           

//***********************CRUD Etudiant**************************************

app.get('/getAllEtudiant',(req , res)=>{
    Etudiant.find({}).then(
        (allEtud)=>{
        res.send(allEtud);
        },
        (erreur)=>{
            console.log(erreur);
        }
        );
    });

app.put('/updateEtudiant/:id',(req, res)=>{
        var id=req.params.id; 
        var n=req.body.nom;
        var p=req.body.prenom;
        var e=req.body.email; 
        var mot=req.body.mot_passe;
        const passwordcrypte = bcrypt.hashSync(mot, 8);

        var telf=req.body.telephone; 
        var dat=req.body.date_naissance; 
        var g=req.body.genre; 
        var ph= req.body.photo;
        Etudiant.findByIdAndUpdate({_id:id} , {$set : {
            nom:n,
            prenom:p,
            email:e, 
            mot_passe:passwordcrypte,
            telephone:telf,
            date_naissance:dat,
            genre:g,
            photo: ph}}).then(
        ()=>{ res.send()},
        (err)=>{console.log(err);});
});




app.put('/bloqueEtudiant/:id',(req, res)=>{
    var id=req.params.id; 
    Etudiant.findByIdAndUpdate({_id:id} , {$set : {etat:false }}).then(
    ()=>{ res.send()},
    (err)=>{console.log(err);});
});


app.put('/debloqueEtudiant/:id',(req, res)=>{
    var id=req.params.id; 
    Etudiant.findByIdAndUpdate({_id:id} , {$set : {etat:true }}).then(
    ()=>{ res.send()},
    (err)=>{console.log(err);});
});


    app.put('/updateNiveau/:id',(req, res, next) => {
        
        Etudiant.findByIdAndUpdate(req.params.id, { $set: req.body}, (error, data) => {
          if (error) {console.log(error)
          } else {
            res.json(data)
          }
        })
    });
    




//***********************CRUD Professeur**************************************


app.post('/addProfesseur', (req, res)=>{
    var prof = req.body; 
    Professeur.findOne({email : prof.email}, (error,users)=>{
   if (error){console.log(error);}
   else {
    if(users){ 
        res.status(400).send("L'adresse email est incorrect ");  
    console.log('professeur ', users);  }
    else { 
        var professeur = new Professeur(prof); 
        const passwordcrypte = bcrypt.hashSync(prof.mot_passe, 8);
        professeur.mot_passe = passwordcrypte; 
        professeur.save().then(
            (savedProfesseur)=>{ 
                console.log("Le professeur a été ajoutée avec succès");
                console.log(savedProfesseur);

                res.send(savedProfesseur);
             })
    }
}})})


app.get('/getAllProfesseur',(req , res)=>{
    Professeur.find({}).then(
        (allProf)=>{
        res.send(allProf)
        },
        (erreur)=>{
            console.log(erreur);
        }
        );
    });

    


    
 app.put('/updateProfesseur/:_id',(req, res)=>{
    var id=req.params._id; 
    var n=req.body.nom;
    var p=req.body.prenom;
    var e=req.body.email; 
    var mot=req.body.mot_passe;
    const passwordcrypte = bcrypt.hashSync(mot, 8);
    var telf=req.body.telephone; 
    var niv=req.body.niveau;
    var g=req.body.genre; 
    var dat=req.body.date_embauche; 
    var ph=req.body.photo;

    Professeur.findByIdAndUpdate({_id:id} , {$set : {
        nom:n,
        prenom:p,
        email:e, 
        mot_passe:passwordcrypte,
        telephone:telf,
        niveau: niv,
        genre:g,
        date_embauche:dat, 
        photo:ph }}).then(
    ()=>{ res.send();},
    (err)=>{console.log(err);});
});




app.put('/bloqueProf/:id',(req, res)=>{
var id=req.params.id; 
Professeur.findByIdAndUpdate({_id:id} , {$set : {etat:false }}).then(
()=>{ res.send()},
(err)=>{console.log(err);});
});


app.put('/debloqueProf/:id',(req, res)=>{
var id=req.params.id; 
Professeur.findByIdAndUpdate({_id:id} , {$set : {etat:true }}).then(
()=>{ res.send()},
(err)=>{console.log(err);});
}); 


// update admin

app.put('/updateAdmin/:id',(req, res)=>{
    var id=req.params.id; 
    var n=req.body.nom;
    var p=req.body.prenom;
    var e=req.body.email; 
    var mot=req.body.mot_passe;
    const passwordcrypte = bcrypt.hashSync(mot, 8);

    Admin.findByIdAndUpdate({_id:id} , {$set : {
        nom:n,
        prenom:p,
        email:e, 
        mot_passe:passwordcrypte}}).then(
    ()=>{ res.send(); 
console.log("les informations ont été bien modifiée ");},
    (err)=>{console.log(err);});
});

//***********************CRUD test Niveau**************************************


app.post('/addTestNiveau', (req, res)=>{
        var test1 = req.body; 
        var test = new Test(test1); 
        test.save().then(
            (savedTest)=>{ 
                res.send(savedTest);
                console.log('La question de test de niveau a été bien ajouté');
                console.log("Les informations de nouveau question ", savedTest );
        })
});


    //retourner le test selon id de prof
app.get('/getTestNiveau/:id',(req , res)=>{
    var id=req.params.id;

    Test.find({id_professeur: id,type:'niveau'}).then(
        (infoTest)=>{
        res.send(infoTest)
        console.log(infoTest);
        },
        (erreur)=>{
            console.log(erreur);
        }
        );
    });


 app.get('/getAllTestInvalid',(req , res)=>{
      Test.find({etat: false,type:'niveau'}).then(
            (infoTest)=>{res.send(infoTest)},
            (erreur)=>{console.log(erreur);} );
   });

app.get('/getAllTestValid',(req , res)=>{
    Test.find({etat: true,type:'niveau'}).then(
          (infoTest)=>{res.send(infoTest)},
          (erreur)=>{console.log(erreur);} );
 });



    app.put('/updateTest/:id',(req, res, next) => {
        Test.findByIdAndUpdate(req.params.id, { $set: req.body}, (error, data) => {
          if (error) {console.log(error)
          } else {
            res.json(data); 
            console.log("La question a été bien modifié ");
            console.log("Les informations de question aprés mise à jour ", data);
          }
        })
    });






//retourner une seul test selon id de question
    app.get('/getOneTest/:id',(req,res)=>{
        var id=req.params.id;
        Test.findOne({_id: id}).then(
            (OneEtudiant)=>{res.send(OneEtudiant);  },
            (err)=>{console.log(err);}
            );
     });

     app.delete('/deleteTest/:id',(req, res)=>{
        var id=req.params.id; 
        Test.findByIdAndRemove({_id:id}).then(
            (deletedtest)=>{res.send(deletedtest);},
            (err)=>{console.log(err);} 
        );
    });



    app.get('/getAllTest',(req , res)=>{
        Test.find({type : 'niveau'}).then(
            (infoTest)=>{res.send(infoTest);},
            (erreur)=>{console.log(erreur);}
        );
     });

     app.get('/passerTest',(req , res)=>{
        Test.find( {etat :true, type:'niveau'}).then(
            (infoTest)=>{res.send(infoTest);},
            (erreur)=>{console.log(erreur);}
        );
     });



     app.put('/valide/:id',(req, res)=>{
        var id=req.params.id; 
        Test.findByIdAndUpdate( {_id:id} , {$set : {etat:true}}).then(
        ()=>{ res.send(); },
        (err)=>{console.log(err);});
        });
            
       
        //***********************CRUD test evaluation**************************************

        app.get('/getTestEval/:id',(req , res)=>{
        var id=req.params.id;
    
        Test.find({id_professeur: id, type:'evaluation'}).then(
            (infoTest)=>{
            res.send(infoTest)
            console.log(infoTest);
            },
            (erreur)=>{
                console.log(erreur);
            }
            );
        });

        app.put('/archiver/:id',(req, res)=>{
            var id=req.params.id; 
            Test.findByIdAndUpdate( {_id:id} , {$set : {etat:false}}).then(
            ()=>{ res.send(); },
            (err)=>{console.log(err);});
            });

         app.get('/passerTestEval/:id',(req , res)=>{
            var id=req.params.id; 
             Etudiant.findOne({_id: id}).then(
                     (OneEtudiant)=>{console.log(OneEtudiant); 
                        Test.find( {etat :true, type:'evaluation', niveau: OneEtudiant.niveau}).then(
                            (infoTest)=>{res.send(infoTest);
                            console.log("les tests    ", infoTest);},
                               (erreur)=>{console.log(erreur);})
                    
                    },
                    (err)=>{console.log(err);})
        })

//***********************Bareme test evaluation**************************************
app.post('/addParametre', (req, res)=>{
    var param = req.body; 
    var parametre = new ParametreTest(param); 
    parametre.save().then(
        (savedBareme)=>{ 
            res.send(savedBareme);
            console.log('Les parametre a été bien ajouté');
    })
});  


//retourne parametre selon id de professeur
app.get('/verifParametre/:id',(req , res)=>{
    var id=req.params.id;

    ParametreTest.findOne({id_professeur: id}).then(
        (infoBareme)=>{
        res.send(infoBareme)
        },
        (erreur)=>{
            console.log(erreur);
        }
        );
    });

    //retourne le note minimal de test d'evaluation selon id de l'etudiant parametreTest.niveau =etudiant.niveau
    app.get('/getNoteTest/:id',(req , res)=>{
        var id=req.params.id; 
         Etudiant.findOne({_id: id}).then(
                 (OneEtudiant)=>{console.log(OneEtudiant); 
                    ParametreTest.find( {niveau: OneEtudiant.niveau}).then(
                        (infoBareme)=>{res.send(infoBareme);
                        console.log("le bareme    ", infoBareme);},
                           (erreur)=>{console.log(erreur);})
                
                },
                (err)=>{console.log(err);})
    })


    //modifier les parametre de test
    app.put('/updateParametre/:id',(req, res, next) => {
       var id = req.params.id;

        ParametreTest.findOne({id_professeur :id}).then(
            (param)=>{console.log(param);
                      ParametreTest.findByIdAndUpdate({_id:param.id}, {$set : req.body},(error, data)=>{
                          if(error){console.log(error);}
                          else{res.json(data)}
                      })
                    },
                    (err)=>{console.log(err);}
        )})
                      

      //***********************CRUD paragraphe**************************************
  app.post('/addParagraphe', (req, res)=>{
    var p = req.body; 
    var paragraphe = new Section(p); 
    paragraphe.save().then(
        (savedParagraphe)=>{ 
            res.send(savedParagraphe);
            console.log('Le Paragraphe a été bien ajouté');
    })
});
app.get('/getOneParagraphe/:id',(req,res)=>{
    var id=req.params.id;
    Section.findOne({_id: id}).then(
        (Paragraphe)=>{res.send(Paragraphe);  },
        (err)=>{console.log(err);}
        );
 });

//retourner le Paragraphe selon id de cours
app.get('/getParagraphe/:id',(req , res)=>{
    var id=req.params.id;
    Section.find({id_cours: id}).then(
        (infoParagraphe)=>{
        res.send(infoParagraphe);
        },
        (erreur)=>{
            console.log(erreur);
        }
        );
    });

    app.put('/updateParagraphe/:id',(req, res) => {
        Section.findByIdAndUpdate(req.params.id, { $set: req.body}, (error, data) => {
          if (error) {console.log(error)
          } else {
            res.json(data)
          }
        })
    });
  //***********************CRUD cours**************************************
  app.post('/addCours', (req, res)=>{
    var c = req.body; 
    var cours = new Cours(c); 
    cours.save().then(
        (savedCours)=>{ 
            res.send(savedCours);
            console.log('Le Cours a été bien ajouté');
    })
});
app.get('/getOneCours/:id',(req,res)=>{
    var id=req.params.id;
    Cours.findOne({_id: id}).then(
        (cours)=>{res.send(cours);  },
        (err)=>{console.log(err);}
        );
 });

//retourner le cours selon id de prof
app.get('/getCours/:id',(req , res)=>{
    var id=req.params.id;
Cours.find({id_professeur: id }).then(
        (infoCours)=>{
        res.send(infoCours);
        },
        (erreur)=>{
            console.log(erreur);
        }
        );
    });

    //UPDATE le cours selon id de cours
    app.put('/updateContenuCours/:id',(req, res) => {
        Cours.findByIdAndUpdate(req.params.id, { $set: req.body}, (error, data) => {
          if (error) {console.log(error)
          } else {
            res.json(data)
          }
        })
    });

    app.put('/archiverCours/:id',(req, res)=>{
        var id=req.params.id; 
        Cours.findByIdAndUpdate( {_id:id} , {$set : {etat:false}}).then(
        ()=>{ res.send(); },
        (err)=>{console.log(err);});
        });



        
    //retourne cours selon niveau de letudiant
    app.get('/consultCours/:id',(req , res)=>{
        var id=req.params.id; 
         Etudiant.findOne({_id: id}).then(
                 (OneEtudiant)=>{console.log(OneEtudiant); 
                    Cours.find( {niveau: OneEtudiant.niveau, etat:true}).then(
                        (infoCours)=>{res.send(infoCours);},
                           (erreur)=>{console.log(erreur);})
                
                },
                (err)=>{console.log(err);})
    })


//********** upload image paragraphe *************** */

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../front-etudiant/src/assets/cours/');
    },
    filename: (req, file, cb) => {
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      if(file.mimetype === 'image/jpg') {
        filetype = 'jpg';
      }
      var day=dateFormat(new Date(), "yyyymmddHHMMss");
      cb(null,  req.params.titre+req.params.id+day + '.' + filetype);
console.log(req.params.titre+req.params.id+day + '.' + filetype);
    }
});

var upload = multer({storage: storage});
app.post('/uploadImgParag/:id/:titre', upload.single('file'), function(req, res) {
    console.log( req.params.id);
    console.log( req.params.titre);
});



//********** upload video  *************** */

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../front-etudiant/src/assets/cours/video/');
    },

    filename : function (req, file, cb){
   
        var filetype = '';
        if(file.mimetype ==="video/mp4") {
          filetype = 'mp4';
        }
        if(file.mimetype === "video/mp4") {
          filetype = 'mp3';
        }
    var day=dateFormat(new Date(), "yyyymmddHHMMss");
    console.log("date   ", day);
      cb(null,  req.params.titre+req.params.id+day + '.' +file.mimetype.split('/')[1]);
console.log(req.params.titre+req.params.id+day + '.' +file.mimetype.split('/')[1]);

    }

    });

var upload = multer({storage: storage});
app.post('/uploadVideoSection/:id/:titre', upload.single('file'), function(req, res) {});
  

//************************** Certificat *********************************** */

app.post('/addCertificat', (req, res)=>{
    var c = req.body; 
    var certif = new Certificat(c); 
    certif.save().then(
        (savedCertificat)=>{ 
            res.send(savedCertificat);
            console.log('La certificat a été bien ajouté');
    })
});

//retourner une certificat  selon id de etudiant
app.get('/readAllCertif/:id',(req,res)=>{
    var id=req.params.id;
    Certificat.find({id_etudiant: id}).then(
        (OneCertif)=>{res.send(OneCertif); },
        (err)=>{console.log(err);}
        );
 });




//************************** Contact  *********************************** */

//retourne liste des etudiant de chaque prof selon le niveau

app.get('/readEtudiant/:id',(req,res)=>{
    var id=req.params.id; //id de prof 
 
    Professeur.findOne({_id:id}).then(
        (infoProf)=>{console.log(infoProf);console.log("niveauu ", infoProf.niveau);
        Etudiant.find({niveau : infoProf.niveau, etat:true}).then(
            (infoEtud)=>{res.send(infoEtud)},
            (err)=>{console.log(err);}
        )},
        (err)=>{console.log(err);}
    )
})


//retourne liste des collegue de chaque etudiant selon le niveau

app.get('/readCollegue/:id',(req,res)=>{
    var id=req.params.id; //id de etudiant 
 
    Etudiant.findOne({_id:id}).then(
        (infoUser)=>{console.log(infoUser);console.log("niveauu ", infoUser.niveau);
        Etudiant.find({niveau : infoUser.niveau, etat:true}).then(
            (infoEtud)=>{res.send(infoEtud)},
            (err)=>{console.log(err);}
        )},
        (err)=>{console.log(err);}
    )
})
   
//retourne les information de prof de chaque etudiant selon le niveau

app.get('/readInfoProf/:id',(req,res)=>{
    var id=req.params.id; 
 
    Etudiant.findOne({_id:id}).then(
        (infoEtud)=>{console.log(infoEtud);console.log("niveauu ", infoEtud.niveau);
        Professeur.find({niveau : infoEtud.niveau}).then(
            (infoProf)=>{res.send(infoProf)},
            (err)=>{console.log(err);}
        )},
        (err)=>{console.log(err);}
    )
})
//add Contact


app.post('/addContact', (req, res)=>{
    var c = req.body; 
    var cont = new Contact(c); 
    cont.save().then(
        (savedContact)=>{ 
            res.send(savedContact);
            console.log('Le message a été envoyée avec succès');
            console.log("Le détail du message ", savedContact);
    })
});




//add retourner contact recu par utilisateur
app.get('/getContact/:id', (req, res)=>{
    var id=req.params.id; //id de l'utilisateur
  

    User.findOne({_id:id}).then(
        (infoUser)=>{console.log(infoUser);console.log("email de l'utilisateur ", infoUser.email);
        Contact.find({email : infoUser.email}).then(
            (listContact)=>{res.send(listContact)
            console.log(listContact);},
            (err)=>{console.log(err);}
        )},
        (err)=>{console.log(err);}
    )
});

//retourner detail de contact  
app.get('/getOneContact/:id',(req,res)=>{
    var id=req.params.id;
    Contact.findOne({_id: id}).then(
        (OneContact)=>{res.send(OneContact); },
        (err)=>{console.log(err);}
        );
 });


 //add retourner contact recu par utilisateur
app.get('/getContactEnvoye/:id', (req, res)=>{
    var id=req.params.id; //id de l'utilisateur
  

    User.findOne({_id:id}).then(
        (infoUser)=>{console.log(infoUser);console.log("email de l'utilisateur ", infoUser.email);
        Contact.find({email2 : infoUser.email}).then(
            (listContact)=>{res.send(listContact)
            console.log(listContact);},
            (err)=>{console.log(err);}
        )},
        (err)=>{console.log(err);}
    )
});


//************************** Reponse  *********************************** */

//add Reponse
app.post('/addReponse', (req, res)=>{
    var r = req.body; 
    var rep = new Reponse(r); 
    rep.save().then(
        (savedReponse)=>{ 
            res.send(savedReponse);
            console.log('La reponse a été bien ajouté');
    })
});

app.get('/getReponse/:id',(req,res)=>{
    var id=req.params.id;
    Reponse.find({id_contact: id}).then(
        (AllReponse)=>{res.send(AllReponse);},
        (err)=>{console.log(err);}
        );
 });


 app.get('/getEmail/:email',(req,res)=>{
    var mail=req.params.email;

    console.log("ddd  ", mail);
     User.findOne( { email: mail}).then(
        (one)=>{res.send(one); 
                  console.log("lfmelfmel  ", one);
        },
        (err)=>{console.log(err);}
    )

 });
//***********************CRUD Reclamation**************************************

app.get('/getAllReclamation',(req , res)=>{
    Reclamation.find({}).then(
        (infoReclam)=>{
        res.send(infoReclam);
        console.log('Réclamation a été bien affiché');
        },
        (err)=>{
            console.log(err);
        }
        );
    });

    app.get('/getReclamation/:id',(req , res)=>{
        var id=req.params.id;
        Reclamation.findOne({_id:id}).then(
            (infoReclam)=>{
            res.send(infoReclam);
            console.log('Détails du réclamation a été bien affiché');
            },
            (err)=>{
                console.log(err);
            }
            );
        });


    app.post('/addReclamation', (req, res)=>{
        var r = req.body; 
        var reclam = new Reclamation(r); 
        reclam.save().then(
            (savedReclam)=>{ 
                res.send(savedReclam);
                console.log('Réclamation a été bien ajouté');
        })
    });



app.listen(3000, ()=> { console.log('server work'); })
