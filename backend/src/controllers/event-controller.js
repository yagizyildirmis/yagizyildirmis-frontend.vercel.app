import { events } from "../data/events.js";

export function getEvents(req, res) {
  const { category } = req.query;
  const list = category
    ? events.filter((event) => event.category === category)
    : events;

  return res.status(200).json(list);
}

export function getEventById(req, res) {
  const event = events.find((item) => item.id === req.params.id);

  if (!event) {
    return res.status(404).json({ error: { message: "Event not found" } });
  }

  return res.status(200).json(event);
}

export function createEvent(req, res) {
  const body = req.body ?? {};
  const requiredFields = ["title", "category", "date"];
  const hasMissingField = requiredFields.some(
    (field) => typeof body[field] !== "string" || body[field].trim() === "",
  );

  if (hasMissingField) {
    return res.status(400).json({
      error: { message: "title, category and date are required" },
    });
  }

  const numericCapacity = Number(body.capacity);
  const newEvent = {
    id: `event-${Date.now()}`,
    title: body.title.trim(),
    category: body.category.trim(),
    date: body.date.trim(),
    time: typeof body.time === "string" ? body.time.trim() : "",
    location: typeof body.location === "string" ? body.location.trim() : "",
    description:
      typeof body.description === "string" ? body.description.trim() : "",
    capacity: Number.isFinite(numericCapacity) ? numericCapacity : 0,
  };

  events.push(newEvent);
  return res.status(201).json(newEvent);
}
