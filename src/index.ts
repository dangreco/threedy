import { Middleware, defineCard, defineEditor } from "@kombu/react";
import { StyledComponentsMiddleware } from "@kombu/react-styled-components";
import Card from "./card";

const middleware: Middleware[] = [StyledComponentsMiddleware()];

const { getConfigElement } = defineEditor(Card, {
  name: "threedy-editor",
  middleware,
});

defineCard(Card, {
  middleware,
  getConfigElement,
  card: {
    type: "threedy-card",
    name: "Threedy Card",
  },
});
