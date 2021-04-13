import { Directive, HostListener, Input, ElementRef } from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appMascara]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MascaraDirective,
    multi: true
  }]
})

export class MascaraDirective implements  ControlValueAccessor {

  onTouched: any;
  onChange: any;

  @Input('appMascara') appMascara: string;

  constructor(private el: ElementRef) { }

  writeValue(value: any) {
    if (value) {
      this.el.nativeElement.value = this.aplicarMascara(value);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    const valor: string = $event.target.value.replace(/\D/g, '');

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }

    const pad = this.appMascara.replace(/\D/g, '').replace(/9/g, '_');
    if (valor.length <= pad.length) {
      this.onChange(valor);
    }

    $event.target.value = this.aplicarMascara(valor);

  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.appMascara.length ) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
  }

  aplicarMascara(valor: string): string {
    valor = valor.replace(/\D/g, '');
    let pad = this.appMascara.replace(/\D/g, '').replace(/9/g, '_');
    let valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;

    valor = '';
    for (let i = 0; i < this.appMascara.length; i++) {
      if (isNaN(parseInt(this.appMascara.charAt(i)))) {
        valor += this.appMascara.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    return valor;
  }

}
