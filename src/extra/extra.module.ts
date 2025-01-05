import { Module } from "@nestjs/common";
import { ExtraRepository } from "./extra.repository";
import { ExtraService } from "./extra.services";
import { ExtraController } from "./extra.controller";

@Module({
  providers: [ExtraRepository, ExtraService],
  controllers: [ExtraController],
})
export class ExtraModule {}
