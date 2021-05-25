import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { AddProfComponent } from './partie-admin/gestion-prof/add-prof/add-prof.component';
import { ReadAllProfComponent } from './partie-admin/gestion-prof/read-all-prof/read-all-prof.component';
import { UpdateProfComponent } from './partie-admin/gestion-prof/update-prof/update-prof.component';
import { DetailTestComponent } from './partie-admin/gestion-test-niveau/detail-test/detail-test.component';
import { ReadAllEtudiantComponent } from './partie-admin/read-all-etudiant/read-all-etudiant.component';
import { UpdateEtudiantComponent } from './partie-admin/update-etudiant/update-etudiant.component';
import { AddTestNiveauComponent } from './partie-professeur/gestion-testNiveau/add-test-niveau/add-test-niveau.component';
import { ConsultTestComponent } from './partie-professeur/gestion-testNiveau/consult-test/consult-test.component';
import { UpdateTestComponent } from './partie-professeur/gestion-testNiveau/update-test/update-test.component';
import { ProfilComponent } from './profil/profil.component';
import { RegistreComponent } from './registre/registre.component';
import { QuestionNiveauComponent } from './question-niveau/question-niveau.component';
import { QuizNiveauComponent } from './quiz-niveau/quiz-niveau.component';
import { AddTestEvaluationComponent } from './partie-professeur/gestionTestEvaluation/add-test-evaluation/add-test-evaluation.component';
import { ConsultTestEvaluationComponent } from './partie-professeur/gestionTestEvaluation/consult-test-evaluation/consult-test-evaluation.component';
import { UpdateTestEvaluationComponent } from './partie-professeur/gestionTestEvaluation/update-test-evaluation/update-test-evaluation.component';
import { QuizEvaluationComponent } from './quiz-evaluation/quiz-evaluation.component';
import { AddCoursComponent } from './partie-professeur/gestion-cours/add-cours/add-cours.component';
import { ReadAllCoursComponent } from './partie-professeur/gestion-cours/read-all-cours/read-all-cours.component';
import { UpdateParagrapheComponent } from './partie-professeur/gestion-cours/update-paragraphe/update-paragraphe.component';
import { DetailsCoursComponent } from './partie-professeur/gestion-cours/details-cours/details-cours.component';
import { AddParagComponent } from './partie-professeur/gestion-cours/add-parag/add-parag.component';
import { ConsultCoursComponent } from './consult-cours/consult-cours.component';
import { ConsultDetailCoursEtudiantComponent } from './consult-detail-cours-etudiant/consult-detail-cours-etudiant.component';
import { ConsultCertificatComponent } from './consult-certificat/consult-certificat.component';
import { ReadAllCertificatComponent } from './read-all-certificat/read-all-certificat.component';
import { ConsultListEtudiantComponent } from './partie-professeur/consult-list-etudiant/consult-list-etudiant.component';
import { ConsultListCollegueComponent } from './consult-list-collegue/consult-list-collegue.component';
import { ContactComponent } from './contact/contact.component';
import { ConsultContactProfComponent } from './partie-professeur/consult-contact-prof/consult-contact-prof.component';
import { ConsultContactEtudiantComponent } from './consult-contact-etudiant/consult-contact-etudiant.component';
import { DetailContactComponent } from './detail-contact/detail-contact.component';
import { AddParametreComponent } from './partie-professeur/gestionTestEvaluation/add-parametre/add-parametre.component';
import { UpdateParametreComponent } from './partie-professeur/gestionTestEvaluation/update-parametre/update-parametre.component';
import { QuestionEvaluationComponent } from './question-evaluation/question-evaluation.component';
import { ConsultReclamationComponent } from './consult-reclamation/consult-reclamation.component';
import { PostulerReclamationComponent } from './postuler-reclamation/postuler-reclamation.component';
import { DetailReclamationComponent } from './detail-reclamation/detail-reclamation.component';
import { ErrorComponent } from './error/error.component';



const routes: Routes = [

  {path : '', component:AccueilComponent, },
  {path : 'login', component:LoginComponent} ,
  {path : 'registre', component:RegistreComponent} ,
  {path : 'profil',component: ProfilComponent, canActivate:[AuthGuard]},
  {path : 'readAllEtudiant',component: ReadAllEtudiantComponent, canActivate:[AuthGuard]},
  {path : 'updateEtudiant/:id',component: UpdateEtudiantComponent, canActivate:[AuthGuard]},
  {path : 'readAllProfesseur',component: ReadAllProfComponent, canActivate:[AuthGuard]},
  {path : 'addProf',component: AddProfComponent, canActivate:[AuthGuard]},
  {path : 'updateProf/:id',component: UpdateProfComponent, canActivate:[AuthGuard]},
  {path : 'addTest',component: AddTestNiveauComponent, canActivate:[AuthGuard]},
  {path: 'addTestNiveau', component:AddTestNiveauComponent, canActivate:[AuthGuard]},
  {path: 'afficheTestNiveau', component:ConsultTestComponent, canActivate:[AuthGuard]},
  {path : 'updateTestNiveau/:id',component: UpdateTestComponent, canActivate:[AuthGuard]},
  {path : 'detailTest',component: DetailTestComponent, canActivate:[AuthGuard]},
  {path : 'questionNiveau',component: QuestionNiveauComponent, canActivate:[AuthGuard]},
  {path : 'quizNiveau',component: QuizNiveauComponent, canActivate:[AuthGuard]},
  {path : 'addTestEvaluation',component: AddTestEvaluationComponent, canActivate:[AuthGuard]},
  {path : 'afficheTestEvaluation',component: ConsultTestEvaluationComponent, canActivate:[AuthGuard]},
  {path : 'updateTestEval/:id',component: UpdateTestEvaluationComponent, canActivate:[AuthGuard]},
  {path : 'questionEvaluation',component: QuestionEvaluationComponent, canActivate:[AuthGuard]},

  {path : 'quizEvaluation',component: QuizEvaluationComponent, canActivate:[AuthGuard]},
  {path : 'addCours',component: AddCoursComponent, canActivate:[AuthGuard]},
  {path : 'afficheCours', component:ReadAllCoursComponent, canActivate:[AuthGuard]},
  {path : 'updateparagraphe/:id',component: UpdateParagrapheComponent, canActivate:[AuthGuard]},
  {path : 'detailsCours/:id', component:DetailsCoursComponent, canActivate:[AuthGuard]},
  {path : 'addTestEvaluation',component: AddTestEvaluationComponent, canActivate:[AuthGuard]},
  {path : 'addParag/:id',component: AddParagComponent, canActivate:[AuthGuard]},
  {path : 'consultCours',component: ConsultCoursComponent, canActivate:[AuthGuard]},
  {path : 'detailsCoursEtudiant/:id',component: ConsultDetailCoursEtudiantComponent, canActivate:[AuthGuard]},
  {path : 'consultCertificat',component: ConsultCertificatComponent, canActivate:[AuthGuard]},
  {path : 'readAllCertif',component: ReadAllCertificatComponent, canActivate:[AuthGuard]},
  {path : 'listEtudiant',component: ConsultListEtudiantComponent, canActivate:[AuthGuard]},
  {path : 'listCollegue',component: ConsultListCollegueComponent, canActivate:[AuthGuard]},
  {path : 'contact/:id',component: ContactComponent, canActivate:[AuthGuard]},

  {path : 'listContactProf',component: ConsultContactProfComponent, canActivate:[AuthGuard]},
  {path : 'listContactEtudiant',component: ConsultContactEtudiantComponent, canActivate:[AuthGuard]},
  {path : 'detailContact/:id',component: DetailContactComponent, canActivate:[AuthGuard]},
  {path : 'detailContactEnvoye/:id',component: DetailContactComponent, canActivate:[AuthGuard]},

  {path : 'addParametre',component: AddParametreComponent, canActivate:[AuthGuard]},
  {path : 'updateParametre',component: UpdateParametreComponent, canActivate:[AuthGuard]},
  
  {path : 'readAllReclamation',component: ConsultReclamationComponent, canActivate:[AuthGuard]},
  {path : 'addReclamation',component: PostulerReclamationComponent, canActivate:[AuthGuard]},
  {path : 'DetailReclamation',component: DetailReclamationComponent, canActivate:[AuthGuard]},

  {path : 'detailsCoursEtud/:id',component: ConsultDetailCoursEtudiantComponent, canActivate:[AuthGuard]},


  {path : '**',component: ErrorComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
