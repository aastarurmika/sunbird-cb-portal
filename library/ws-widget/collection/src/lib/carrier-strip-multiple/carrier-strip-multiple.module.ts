import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { CarrierStripMultipleComponent } from './carrier-strip-multiple.component'
import { HorizontalScrollerModule } from '@ws-widget/utils'
import { WidgetResolverModule } from '@ws-widget/resolver'
import {
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatCardModule,
} from '@angular/material'

@NgModule({
  declarations: [CarrierStripMultipleComponent],
  imports: [
    CommonModule,
    RouterModule,
    HorizontalScrollerModule,
    WidgetResolverModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
  ],
  entryComponents: [CarrierStripMultipleComponent],
})
export class CarrierStripMultipleModule { }
