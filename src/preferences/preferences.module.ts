import { Module } from "@nestjs/common";
import { PreferencesTransport } from "src/shared/data/transports/preferences.transport";
import { PreferencesController } from "./controllers/preferences.controller";
import { ImpairmentController } from "./controllers/impairment.controller";
import { OccupationController } from "./controllers/occupation.controller";

@Module({
    imports: [
        PreferencesTransport
    ],
    controllers: [
        PreferencesController,
        ImpairmentController,
        OccupationController,
    ]
})
export class PreferencesModule{}