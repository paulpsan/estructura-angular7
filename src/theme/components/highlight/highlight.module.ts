import { NgModule } from '@angular/core';

import { FuseHighlightComponent } from 'theme/components/highlight/highlight.component';

@NgModule({
    declarations: [
        FuseHighlightComponent
    ],
    exports: [
        FuseHighlightComponent
    ],
})
export class FuseHighlightModule
{
}
