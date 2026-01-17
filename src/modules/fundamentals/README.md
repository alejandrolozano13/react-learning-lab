🎯 Module Goal

Build a static catalog application using React fundamentals, focusing on component structure, props, lists, events and basic styling.

This module should not use:

state hooks

effects

external libraries

API calls

🧠 Concepts You Must Apply

Project and folder structure

Functional components

Props (data flow parent → child)

Rendering lists with map

Correct usage of key

Handling user events

Basic CSS styling

Separation of concerns

🛠 Mini Project Description

You are building a static item catalog.

The application must:

Render a list of items from a local data source

Display each item using a reusable component

Allow user interaction through events

Be visually organized with basic CSS

📂 Required Files & Responsibilities

You already created the folders. Now define the responsibilities:

mock/

Contains a static list of items

Defines the item data structure (type/interface)

❓ Think about:

What properties does an item need?

How generic should this model be?

components/

You must create at least:

A component responsible for rendering a single item

A component responsible for rendering a list of items

❓ Think about:

What data should each component receive?

Which component should handle user interaction?

Which component should be reusable?

page.tsx

Entry point of the module

Composes the page using smaller components

Handles interactions at a higher level

❓ Think about:

Where should event handlers live?

How do components communicate?

styles/

Contains only styles related to this module

❓ Think about:

How to name classes?

How to avoid coupling styles to structure?

🧪 Functional Requirements

Your solution must satisfy:

Items are rendered dynamically (no hardcoded JSX per item)

Each item component receives data via props

A user interaction exists (click, select, etc.)

Interaction is handled via event props

Styling is applied using CSS files

✅ Quality Checklist

Before considering the module “done”, verify:

 Components have a single responsibility

 No duplicated JSX

 Props are typed

 Lists use stable keys

 CSS is scoped to the module

 No business logic inside JSX

 File and folder names are meaningful

🧭 Reflection Questions (Important)

Answer these for yourself (or in Notion):

Why did you split components the way you did?

Could any component be reused in another module?

Where does the data flow start and where does it end?

What would break if the item structure changed?

What would need to change to make this dynamic?

🚦 Exit Criteria

You can move to Module 02 – State & Effects when:

You can explain every file you wrote

You can justify your component boundaries

You can explain how props and events flow

You feel slightly uncomfortable but confident

🔜 Next Module Preview

In Module 02 you will:

Introduce useState

Control UI state

Add search and filtering

Handle user-driven reactivity