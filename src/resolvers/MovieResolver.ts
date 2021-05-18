import { Movie } from "../entity/Movie";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class MovieInput {
  @Field()
  title: string

  @Field(() => Int, { defaultValue: 60 })
  minutes: number
}

@InputType()
class MovieUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string
  // the ? makes the field optional when updating
  @Field(() => Int, { nullable: true })
  minutes?: number
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  createMovie(
    @Arg('options', () => MovieInput) options: MovieInput
    ) {
    return Movie.create(options).save()
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg('id', () => Int) id: number,
    @Arg('input', () => MovieUpdateInput) input: MovieUpdateInput
  ) {

    await Movie.update({ id }, input)
    return true;
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg('id', () => Int) id: number) {
    await Movie.delete({ id });

    return true;
  }

  @Query(() => [Movie])
  movies() {
    return Movie.find()
  }
}