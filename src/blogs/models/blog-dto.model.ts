import { TranslationDto } from "./translation-dto.model";

export interface BlogDto {
  translations: TranslationDto[];
  imageUrl: string;
  url: string;
  tags: string;
}
