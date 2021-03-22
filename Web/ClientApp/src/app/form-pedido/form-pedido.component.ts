import { Pedido, item } from './../pedido';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-form-pedido',
  templateUrl: './form-pedido.component.html'
})
export class FormPedidoComponent implements OnInit, OnChanges {

  eEntrega: boolean = false;
  @Input() pedidoValue: Pedido | undefined = undefined;
  @Output() submitExecuted: EventEmitter<FormGroup> = new EventEmitter();

  formGroup: FormGroup | undefined = undefined;

  constructor(
    private builder: FormBuilder
  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {


  }

  ngOnInit(): void {

    if (this.pedidoValue) {
      this.formGroup = this.builder.group({
        id: this.pedidoValue.id,
        cliente: this.builder.control(this.pedidoValue.cliente, [Validators.required]),
        dataPedido: this.builder.control(this.pedidoValue.dataPedido, [Validators.required]),
        dataEntrega: this.builder.control(this.pedidoValue.dataEntrega, [Validators.required]),
        entregaRetirada: this.builder.control(this.pedidoValue.entregaRetirada, [Validators.required]),
        enderecoEntrega: this.builder.control(this.pedidoValue.enderecoEntrega),
        pedido: this.builder.array(this.pedidoValue.pedido.map(p => {
          return this.builder.group({
            nome: this.builder.control(p.nome),
            quantidade: this.builder.control(p.quantidade),
            valor: this.builder.control(p.valor),
            obs: this.builder.control(p.obs)
          })
        })),
        obs: this.builder.control(this.pedidoValue.obs),
        recheio: this.builder.control(this.pedidoValue.recheio, [Validators.required]),
        total: this.builder.control(this.pedidoValue.total, Validators.required),
        metodoPagamento: this.builder.control(this.pedidoValue.metodoPagamento),
        statusPagamento: this.builder.control(this.pedidoValue.statusPagamento, [Validators.required]),
        pendencias: this.builder.control(this.pedidoValue.pendencias)
      });
    } else {
      this.formGroup = this.builder.group({
        id: '',
        cliente: this.builder.control('', [Validators.required]),
        dataPedido: this.builder.control('', [Validators.required]),
        dataEntrega: this.builder.control('', [Validators.required]),
        entregaRetirada: this.builder.control('', [Validators.required]),
        enderecoEntrega: this.builder.control(''),
        pedido: this.builder.array([
          this.builder.group({
            nome: this.builder.control(''),
            quantidade: this.builder.control(1),
            valor: this.builder.control(0.0),
            obs: this.builder.control('')
          })
        ]),
        obs: this.builder.control(''),
        recheio: this.builder.control('', [Validators.required]),
        total: this.builder.control('', [Validators.required]),
        metodoPagamento: this.builder.control(''),
        statusPagamento: this.builder.control('', [Validators.required]),
        pendencias: this.builder.control('')
      });
    }
    this.formGroup?.get('entregaRetirada')?.valueChanges.subscribe(val => {
      this.changeTipoEntrega(val)
    });

    this.formGroup.get('pedido')?.valueChanges.subscribe((groups: item[]) => {
      var totalValue = 0;
      groups.forEach( (i) => {
        totalValue += i.quantidade * i.valor;
      });

      this.formGroup?.get('total')?.setValue(totalValue)
    })
  }

  onSubmit(event: any) {
    event.preventDefault();
    this.submitExecuted.emit(this.formGroup);
  }

  changeTipoEntrega(valor: string) {
    switch (valor) {
      case 'ENTREGA':
        {
          this.eEntrega = true;
          break;
        }
      case 'RETIRADA': {
        this.eEntrega = false;
        break;
      }
      default: {
        this.eEntrega = false;
        break;
      }
    }
  }

  getFormJson(): string {
    return JSON.stringify(this.formGroup?.value);
  }

  addItemPedido() {
    const formArray = this.formGroup?.get('pedido') as FormArray
    formArray.push(this.builder.group({
      nome: this.builder.control(''),
      quantidade: this.builder.control(1),
      valor: this.builder.control(0.0),
      obs: this.builder.control('')
    }))
  }

}
