import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule  } from '@angular/forms';

import {  ReactiveFormsModule  } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';





import {
  
  MatToolbarModule,
} from '@angular/material/toolbar';



import {
  
  MatProgressBarModule,
    
} from '@angular/material/progress-bar';



import {
  
  MatProgressSpinnerModule,
    
} from '@angular/material/progress-spinner';









import { AppComponent } from './app.component';
import { RegistreComponent } from './registre/registre.component';
import { HttpClientModule} from '@angular/common/http';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReadAllEtudiantComponent } from './partie-admin/read-all-etudiant/read-all-etudiant.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { UpdateEtudiantComponent } from './partie-admin/update-etudiant/update-etudiant.component';
import { ReadAllProfComponent } from './partie-admin/gestion-prof/read-all-prof/read-all-prof.component';
import { UpdateProfComponent } from './partie-admin/gestion-prof/update-prof/update-prof.component';
import { AddProfComponent } from './partie-admin/gestion-prof/add-prof/add-prof.component';
import { HeaderComponent } from './partie-admin/header/header.component';
import { ProfilComponent } from './profil/profil.component';
import { AddTestNiveauComponent } from './partie-professeur/gestion-testNiveau/add-test-niveau/add-test-niveau.component';
import { HeaderProfComponent } from './partie-professeur/header-prof/header-prof.component';
import { ConsultTestComponent } from './partie-professeur/gestion-testNiveau/consult-test/consult-test.component';
import { UpdateTestComponent } from './partie-professeur/gestion-testNiveau/update-test/update-test.component';
import { DetailTestComponent } from './partie-admin/gestion-test-niveau/detail-test/detail-test.component';
import { HeaderEtudiantComponent } from './header-etudiant/header-etudiant.component';
import { QuestionNiveauComponent } from './question-niveau/question-niveau.component';
import { QuizNiveauComponent } from './quiz-niveau/quiz-niveau.component';
import { ConsultTestEvaluationComponent } from './partie-professeur/gestionTestEvaluation/consult-test-evaluation/consult-test-evaluation.component';
import { UpdateTestEvaluationComponent } from './partie-professeur/gestionTestEvaluation/update-test-evaluation/update-test-evaluation.component';
import { AddTestEvaluationComponent } from './partie-professeur/gestionTestEvaluation/add-test-evaluation/add-test-evaluation.component';
import { QuizEvaluationComponent } from './quiz-evaluation/quiz-evaluation.component';
import { AddCoursComponent } from './partie-professeur/gestion-cours/add-cours/add-cours.component';
import { DetailsCoursComponent } from './partie-professeur/gestion-cours/details-cours/details-cours.component';
import { ReadAllCoursComponent } from './partie-professeur/gestion-cours/read-all-cours/read-all-cours.component';
import { UpdateParagrapheComponent } from './partie-professeur/gestion-cours/update-paragraphe/update-paragraphe.component';
import { AddParagComponent } from './partie-professeur/gestion-cours/add-parag/add-parag.component';
import { ConsultCoursComponent } from './consult-cours/consult-cours.component';
import { ConsultDetailCoursEtudiantComponent } from './consult-detail-cours-etudiant/consult-detail-cours-etudiant.component';
import { ConsultCertificatComponent } from './consult-certificat/consult-certificat.component';
import { ReadAllCertificatComponent } from './read-all-certificat/read-all-certificat.component';
import { ReadOneCertificatComponent } from './read-one-certificat/read-one-certificat.component';
import { ConsultListEtudiantComponent } from './partie-professeur/consult-list-etudiant/consult-list-etudiant.component';
import { ConsultListCollegueComponent } from './consult-list-collegue/consult-list-collegue.component';
import { ContactComponent } from './contact/contact.component';
import { ConsultContactProfComponent } from './partie-professeur/consult-contact-prof/consult-contact-prof.component';
import { ConsultContactEtudiantComponent } from './consult-contact-etudiant/consult-contact-etudiant.component';
import { DetailContactComponent } from './detail-contact/detail-contact.component';
import { AddParametreComponent } from './partie-professeur/gestionTestEvaluation/add-parametre/add-parametre.component';
import { UpdateParametreComponent } from './partie-professeur/gestionTestEvaluation/update-parametre/update-parametre.component';
import { DetailContactEnvoyeComponent } from './detail-contact-envoye/detail-contact-envoye.component';
import { QuestionEvaluationComponent } from './question-evaluation/question-evaluation.component';
import { PostulerReclamationComponent } from './postuler-reclamation/postuler-reclamation.component';
import { ConsultReclamationComponent } from './consult-reclamation/consult-reclamation.component';
import { DetailReclamationComponent } from './detail-reclamation/detail-reclamation.component';
import { ErrorComponent } from './error/error.component';
import { EnvoyermessageComponent } from './envoyermessage/envoyermessage.component';
import { EnvoyermsgProfComponent } from './envoyermsg-prof/envoyermsg-prof.component';














@NgModule({
  declarations: [
    AppComponent,
    RegistreComponent,
    AccueilComponent,
    LoginComponent,
    ReadAllEtudiantComponent,
    UpdateEtudiantComponent,
    ReadAllProfComponent,
    UpdateProfComponent,
    ReadAllProfComponent,
    AddProfComponent,
    HeaderComponent,
    ProfilComponent,
    AddTestNiveauComponent,
    HeaderProfComponent,
    ConsultTestComponent,
    UpdateTestComponent,
    DetailTestComponent,
    HeaderEtudiantComponent,
    QuestionNiveauComponent,
    QuizNiveauComponent,
    ConsultTestEvaluationComponent,
    UpdateTestEvaluationComponent,
    AddTestEvaluationComponent,
    QuestionEvaluationComponent,
    QuizEvaluationComponent,
    AddCoursComponent,
    DetailsCoursComponent,
    ReadAllCoursComponent,
    UpdateParagrapheComponent,
    AddParagComponent,
    ConsultCoursComponent,
    ConsultDetailCoursEtudiantComponent,
    ConsultCertificatComponent,
    ReadAllCertificatComponent,
    ReadOneCertificatComponent,
    ConsultListEtudiantComponent,
    ConsultListCollegueComponent,
    ContactComponent,
    ConsultContactProfComponent,
    ConsultContactEtudiantComponent,
    DetailContactComponent,
    AddParametreComponent,
    UpdateParametreComponent,
    DetailContactEnvoyeComponent,
    PostulerReclamationComponent,
    ConsultReclamationComponent,
    DetailReclamationComponent,
    ErrorComponent,
    EnvoyermessageComponent,
    EnvoyermsgProfComponent,
  
 
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
     ReactiveFormsModule, 
     HttpClientModule,
      BrowserAnimationsModule,
      MatSliderModule, 
      MatChipsModule,
      MatToolbarModule,
      MatToolbarModule,
      MatDialogModule,
      MatProgressBarModule,
    MatProgressSpinnerModule,
    ToastNoAnimationModule.forRoot(),

     
      ConfirmationPopoverModule.forRoot({ confirmButtonType:'info',  confirmText:'OK', cancelText:'Annuler'}) 
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AddProfComponent  , ReadOneCertificatComponent]
})
export class AppModule { }
