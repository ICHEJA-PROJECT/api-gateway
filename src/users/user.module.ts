import { Module } from "@nestjs/common";
import { UsersTransport } from "src/shared/data/transports/users.transport";
import { PersonController } from "./controllers/person.controller";
import { RoadTypeController } from "./controllers/road_type.controller";
import { SettlementController } from "./controllers/settlement.controller";
import { MunipalicityController } from "./controllers/municipality.controller";
import { TownController } from "./controllers/town.controller";
import { RoleController } from "./controllers/role.controller";
import { RolePersonController } from "./controllers/role_person.controller";
import { ScheduleController } from "./controllers/schedule.controller";
import { SchedulePersonController } from "./controllers/schedule_person.controller";
import { StudentController } from "./controllers/student.controller";
import { InstitutionController } from "./controllers/institution.controller";
import { CellController } from "./controllers/cell.controller";
import { TeacherCellController } from "./controllers/teacher_cell.controller";

@Module({
    imports: [
        UsersTransport
    ],
    controllers: [
        PersonController,
        RoadTypeController,
        SettlementController,
        MunipalicityController,
        TownController,
        RoleController,
        RolePersonController,
        ScheduleController,
        SchedulePersonController,
        StudentController,
        InstitutionController,
        CellController,
        TeacherCellController,
    ],
})
export class UserModule {}