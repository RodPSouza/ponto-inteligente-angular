import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascaraDirective } from './directives/mascara.directive';

@NgModule({

  imports: [
    CommonModule
  ],
  declarations: [MascaraDirective],
  exports: [MascaraDirective]
})

export class SharedModule { }
