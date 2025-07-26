import { Module } from "@nestjs/common";
import { PreferencesTransport } from "src/shared/data/transports/preferences.transport";
import { PreferencesController } from "./controllers/preferences.controller";

@Module({
    imports: [
        PreferencesTransport
    ],
    controllers: [
        PreferencesController
    ]
})
export class PreferencesModule{}