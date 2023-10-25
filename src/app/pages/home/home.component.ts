import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import menu from 'src/assets/json/menu.json'
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public coverForm: FormGroup | any;
  public userForm: FormGroup | any;
  public person: any = [];
  public indexTab = 0
  public functionForm = new FormGroup({});
  public fiabilityForm = new FormGroup({});
  public usabilityForm = new FormGroup({});
  public efficiencyForm = new FormGroup({});
  public maintenanceForm = new FormGroup({});
  public portabilityForm = new FormGroup({});
  public qualityForm = new FormGroup({});

  @ViewChild('funcionalidadPuntos') funcionalidadPuntos: ElementRef | undefined;
  @ViewChild('fiablidadPuntos') fiablidadPuntos: ElementRef | undefined;
  @ViewChild('usabilidadPuntos') usabilidadPuntos: ElementRef | undefined;
  @ViewChild('eficienciaPuntos') eficienciaPuntos: ElementRef | undefined;
  @ViewChild('mantenimientoPuntos') mantenimientoPuntos: ElementRef | undefined;
  @ViewChild('portabilidadPuntos') portabilidadPuntos: ElementRef | undefined;
  @ViewChild('calidadPuntos') calidadPuntos: ElementRef | undefined;


  @ViewChild('funcionalidadPorcentaje') funcionalidadPorcentaje: ElementRef | undefined;
  @ViewChild('fiablidadPorcentaje') fiablidadPorcentaje: ElementRef | undefined;
  @ViewChild('usabilidadPorcentaje') usabilidadPorcentaje: ElementRef | undefined;
  @ViewChild('eficienciaPorcentaje') eficienciaPorcentaje: ElementRef | undefined;
  @ViewChild('mantenimientoPorcentaje') mantenimientoPorcentaje: ElementRef | undefined;
  @ViewChild('portabilidadPorcentaje') portabilidadPorcentaje: ElementRef | undefined;
  @ViewChild('calidadPorcentaje') calidadPorcentaje: ElementRef | undefined;


  public menu:any = menu

  constructor() { }

  ngOnInit(): void {    
    this.coverForm = new FormGroup({
      date: new FormControl('', Validators.required),
      city: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      business: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      cellphone: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(2), Validators.maxLength(20)]),
      softwareName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      generalObjectives: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      specificObjectives: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)])
    });
    this.userForm = new FormGroup({
      role: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      sign: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)])
    })

    this.buildForms(this.menu);
   
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log(tabChangeEvent);
    
    this.indexTab = tabChangeEvent.index
  }

  calculatePorcent(points:any, total:number){
    return (points * 100 / total).toFixed(2);
  }

  calculatePorcentGob(porcenInitial:string, total:number){
    return ((parseFloat(porcenInitial) * total)/100).toFixed(2);
  }

  calculatePoints(form:any, menu:string){
    let points:number = 0
    this.menu[menu].map((item:any) => {
      if(form.value[item.valor] > 0 && form.value[item.valor] < 4)
      points = points + parseInt(form.value[item.valor])
    })
    return points
  }

  calculateTotalPoints(){
    
    let funcionalidadPuntos = parseInt(this.funcionalidadPuntos?.nativeElement.textContent > 0 ? this.funcionalidadPuntos?.nativeElement.textContent : 0);
    let fiablidadPuntos = parseInt(this.fiablidadPuntos?.nativeElement.textContent > 0 ? this.fiablidadPuntos?.nativeElement.textContent : 0);
    let usabilidadPuntos = parseInt(this.usabilidadPuntos?.nativeElement.textContent > 0 ? this.usabilidadPuntos?.nativeElement.textContent : 0);
    let eficienciaPuntos = parseInt(this.eficienciaPuntos?.nativeElement.textContent > 0 ? this.eficienciaPuntos?.nativeElement.textContent : 0);
    let mantenimientoPuntos = parseInt(this.mantenimientoPuntos?.nativeElement.textContent > 0 ? this.mantenimientoPuntos?.nativeElement.textContent : 0);
    let portabilidadPuntos = parseInt(this.portabilidadPuntos?.nativeElement.textContent > 0 ? this.portabilidadPuntos?.nativeElement.textContent : 0);
    let calidadPuntos = parseInt(this.calidadPuntos?.nativeElement.textContent > 0 ? this.calidadPuntos?.nativeElement.textContent : 0);
    return funcionalidadPuntos + fiablidadPuntos + usabilidadPuntos + eficienciaPuntos + mantenimientoPuntos + portabilidadPuntos + calidadPuntos
  }

  colorTotal(){
    let color = ""
    let x = parseFloat(this.calculatePorcentTotalGob())
    switch (true) {
      case x < 31 :
        color = '#e31e17'
        break;
      case x < 51:
        color = '#952d6a'
        break;
      case x < 71:
        color = '#7b8800'
        break;
      case x < 90:
        color = '#3f7f80'
        break;
        
      default:
        color = '#436566'
        break;
    }
    return color
  }
  
  calculatePorcentTotalGob(){

    let funcionalidadPorcentaje = parseFloat(parseFloat(this.funcionalidadPorcentaje?.nativeElement.textContent) > 0 ? this.funcionalidadPorcentaje?.nativeElement.textContent : 0);
    let fiablidadPorcentaje = parseFloat(parseFloat(this.fiablidadPorcentaje?.nativeElement.textContent) > 0 ? this.fiablidadPorcentaje?.nativeElement.textContent : 0);
    let usabilidadPorcentaje = parseFloat(parseFloat(this.usabilidadPorcentaje?.nativeElement.textContent) > 0 ? this.usabilidadPorcentaje?.nativeElement.textContent : 0);
    let eficienciaPorcentaje = parseFloat(parseFloat(this.eficienciaPorcentaje?.nativeElement.textContent) > 0 ? this.eficienciaPorcentaje?.nativeElement.textContent : 0);
    let mantenimientoPorcentaje = parseFloat(parseFloat(this.mantenimientoPorcentaje?.nativeElement.textContent) > 0 ? this.mantenimientoPorcentaje?.nativeElement.textContent : 0);
    let portabilidadPorcentaje = parseFloat(parseFloat(this.portabilidadPorcentaje?.nativeElement.textContent) > 0 ? this.portabilidadPorcentaje?.nativeElement.textContent : 0);
    let calidadPorcentaje = parseFloat(parseFloat(this.calidadPorcentaje?.nativeElement.textContent) > 0 ? this.calidadPorcentaje?.nativeElement.textContent : 0);

    return (funcionalidadPorcentaje+fiablidadPorcentaje+usabilidadPorcentaje+eficienciaPorcentaje+mantenimientoPorcentaje+portabilidadPorcentaje+calidadPorcentaje).toFixed(2)
  }

  buildForms(menu:any):void{
    //functionForm
    menu.funcionalidad.map((item:any) => {
      this.functionForm.addControl(item.valor, new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0), Validators.max(3)]));
      this.functionForm.addControl(item.observacion, new FormControl('', [Validators.maxLength(255)]))
    })

    //fiabilityForm
    menu.fiabilidad.map((item:any) => {
      this.fiabilityForm.addControl(item.valor, new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0), Validators.max(3)]));
      this.fiabilityForm.addControl(item.observacion, new FormControl('', [Validators.maxLength(255)]))
    })

    //usabilityForm
    menu.usabilidad.map((item:any) => {
      this.usabilityForm.addControl(item.valor, new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0), Validators.max(3)]));
      this.usabilityForm.addControl(item.observacion, new FormControl('', [Validators.maxLength(255)]))
    })

    //efficiencyForm
    menu.eficiencia.map((item:any)=> {
      this.efficiencyForm.addControl(item.valor, new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0), Validators.max(3)]));
      this.efficiencyForm.addControl(item.observacion, new FormControl('', [Validators.maxLength(255)]))
    })

    //maintenanceForm
    menu.mantenimiento.map((item:any) =>{
      this.maintenanceForm.addControl(item.valor, new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0), Validators.max(3)]));
      this.maintenanceForm.addControl(item.observacion, new FormControl('', [Validators.maxLength(255)]))
    })

    //portabilityForm
    menu.portabilidad.map((item:any) => {
      this.portabilityForm.addControl(item.valor, new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0), Validators.max(3)]));
      this.portabilityForm.addControl(item.observacion, new FormControl('', [Validators.maxLength(255)]))
    })

    //qualityForm
    menu.calidad.map((item:any)=>{
      this.qualityForm.addControl(item.valor, new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0), Validators.max(3)]));
      this.qualityForm.addControl(item.observacion, new FormControl('', [Validators.maxLength(255)]))
    })
   
  }

  addPerson():void{    
    if(this.userForm.valid){
      let valid = this.person.find((person:any) => person.name == this.userForm.value.name)
      if(valid == null){
        this.person.push(this.userForm.value)
      } 
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El usuario ya existe!',
        })
      } 
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes completar el formulario de forma correcta!',
      })
    }
  }

  deletePerson(index:any):void{
    Swal.fire({
      title: 'Quiere eliminar la persona '+this.person[index].name+'?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.person.splice(index,1)
      }
    })
  }

  next(form:any, value:number){
   if (form.valid){
    this.indexTab = value + 1
   }
  }

}
