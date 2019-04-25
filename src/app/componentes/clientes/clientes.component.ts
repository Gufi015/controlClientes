import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from '../../servicios/cliente.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"]
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  //asignar un objeto de tipo clientem
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };

  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(private clienteServicio: ClienteServicio, private flashMessages:FlashMessagesService) {}

  ngOnInit() {
    this.clienteServicio.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach(cliente => {
        saldoTotal = saldoTotal + cliente.saldo;
      });
    }
    return saldoTotal;
  }

  //agregar cliente

  agregarCliente({value, valid}: {value:Cliente, valid: boolean}){
    if(!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente!',{
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      this.clienteServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();

    }

  }
  //metodo para cerrar ventana modal
  private cerrarModal(){
    this.botonCerrar.nativeElement.click();

  }
}
