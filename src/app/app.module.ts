import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import * as Hammer from 'hammerjs';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL }
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'classroot-tech' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    SharedModule
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
