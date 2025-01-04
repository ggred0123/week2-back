import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class MeetingQuery {
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    description: "카테고리 ID",
    type: Number,
  })
  categoryId!: number;
}
