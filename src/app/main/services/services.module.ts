import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './rest.service';
import { HttpService } from './http.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    providers: [RestService, HttpService]
})
export class ServicesModule {}
