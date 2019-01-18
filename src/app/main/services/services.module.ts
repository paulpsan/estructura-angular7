import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestService } from './rest.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    providers: [RestService]
})
export class ServicesModule {}
