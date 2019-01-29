import { NgModule } from '@angular/core';

import { ComingSoonModule } from 'app/main/pages/coming-soon/coming-soon.module';
import { Error404Module } from 'app/main/pages/errors/404/error-404.module';
import { Error500Module } from 'app/main/pages/errors/500/error-500.module';
import { InvoiceModernModule } from 'app/main/pages/invoices/modern/modern.module';
import { InvoiceCompactModule } from 'app/main/pages/invoices/compact/compact.module';
import { MaintenanceModule } from 'app/main/pages/maintenance/maintenence.module';
import { PricingModule } from 'app/main/pages/pricing/pricing.module';
import { ProfileModule } from 'app/main/pages/profile/profile.module';
import { SearchClassicModule } from 'app/main/pages/search/classic/search-classic.module';
import { SearchModernModule } from 'app/main/pages/search/modern/search-modern.module';
import { FaqModule } from 'app/main/pages/faq/faq.module';
import { KnowledgeBaseModule } from 'app/main/pages/knowledge-base/knowledge-base.module';
import { DirectoresModule } from './directores/directores.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { ListadoModule } from './listado/listado.module';
import { RegistroModule } from './registro/registro.module';
import { TematicasModule } from './tematicas/tematicas.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosModule } from './usuarios/usuarios.module';
@NgModule({
    imports: [
        // Coming-soon
        ComingSoonModule,

        // Errors
        Error404Module,
        Error500Module,

        // Invoices
        InvoiceModernModule,
        InvoiceCompactModule,

        // Maintenance
        MaintenanceModule,

        // Pricing
        PricingModule,

        // Profile
        ProfileModule,

        // Search
        SearchClassicModule,
        SearchModernModule,

        // Faq
        FaqModule,

        // Knowledge base
        KnowledgeBaseModule,
        // paginas
        RegistroModule,
        DirectoresModule,
        SeguimientoModule,
        ListadoModule,
        TematicasModule,
        UsuariosModule
    ],
    declarations: []
})
export class PagesModule {}
