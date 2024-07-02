export class CreateBookDto {
  readonly author: string;
  readonly title: string;
  readonly publicationDate: Date;
  readonly genres: string[];
}
