import { Info } from "../types/Info";

const eventBus = new Comment("event-bus");

export type EventArgs<T> = { args: T };

export type InfoEventArgs = EventArgs<Info>;

type EventsDefinition = {
  info: EventArgs<Info>;
};

type GameEvents = keyof EventsDefinition;

export function publish<T extends GameEvents>(
  eventName: T,
  payload?: EventsDefinition[T]
): void {
  const event = payload
    ? new CustomEvent(eventName, { detail: payload })
    : new CustomEvent(eventName);
  eventBus.dispatchEvent(event);
}

type Unsubscribe = () => void;

function isCustomEvent(event: Event): event is CustomEvent {
  return "detail" in event;
}

export function subscribe<T extends GameEvents>(
  eventName: T,
  handlerFn: (payload: EventsDefinition[T]) => void
): Unsubscribe {
  const eventHandler = (event: Event) => {
    if (isCustomEvent(event)) {
      const eventPayload: EventsDefinition[T] =
        event.detail as EventsDefinition[T];
      handlerFn(eventPayload);
    }
  };
  eventBus.addEventListener(eventName, eventHandler);
  return () => {
    eventBus.removeEventListener(eventName, eventHandler);
  };
}
