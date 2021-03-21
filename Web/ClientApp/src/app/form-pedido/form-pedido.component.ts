import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-form-pedido',
  templateUrl: './form-pedido.component.html'
})
export class FormPedidoComponent implements OnInit, OnChanges {

  @Input() formGroup: FormGroup;
  @Output() submitExecuted: EventEmitter<FormGroup> = new EventEmitter();

  eEntrega = true;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.formGroup.get('entregaRetirada').valueChanges.subscribe(val => {
      this.changeTipoEntrega(val)
    });
  }

  ngOnInit(): void {

    
  }

  onSubmit(event) {
    event.preventDefault();
    this.submitExecuted.emit(this.formGroup);
  }

  changeTipoEntrega(valor) {
    switch(valor) {
      case 'entrega':
        {
          this.eEntrega = true;
          break;
        }
      case 'retirada' : {
        this.eEntrega = false;
        break;
      }
    }
  }

}
