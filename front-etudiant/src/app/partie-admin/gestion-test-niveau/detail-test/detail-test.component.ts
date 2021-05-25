import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-detail-test',
  templateUrl: './detail-test.component.html',
  styleUrls: ['./detail-test.component.css']
})
export class DetailTestComponent implements OnInit {
  listTest: any;
  listValide: any;

  popoverTitle1 = 'Confirmation de validation ';
  popoverMessage1 = 'Veuillez-vous vraiment valider ce question ?';
  confirmClicked = false;
  cancelClicked = false;
  alert: boolean;
  msg : String ;

  popoverTitle2 = 'Confirmation de suppression ';
  popoverMessage2 = 'Veuillez-vous vraiment supprimer ce question de test ?';
  constructor(private router: Router, private route: ActivatedRoute, private testService :TestService) { }
  


  ngOnInit(): void {
   this.testService.consultQuestionInvalid().subscribe(
    (res)=>{this.listTest=res; },
    (err)=>{console.log(err);
    }
    
  )
  this.testService.consultQuestionValid().subscribe(
    (res)=>{this.listValide=res;},
    (err)=>{console.log(err);
    }
  )
   
  }
 
  valider(id: any){
    this.testService.valide(id,true).subscribe(
      (res)=>{this.ngOnInit();
        var messag=" Le question a été accepté";
        this.alert=true;
        this.msg=messag;},
      (err)=>{console.log(err);
      }
    )
  }
  supprimer(id:any){
    this.testService.deleteTest(id).subscribe(
  
      (res)=>{this.ngOnInit();
        var messag=" Le question a été supprimé de test de niveau";
        this.alert=true;
        this.msg=messag;},
      (err)=>{console.log(err);
      }
    )

  }

}
