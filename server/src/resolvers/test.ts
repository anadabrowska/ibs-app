import { Resolver, Query } from "type-graphql";

@Resolver()
export class TestResover {
  @Query(() => String)
  test() {
    return "hello world";
  }
}
