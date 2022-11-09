# To do

## Important

### Features

- Explain what the app does and the aproach
- Change maxY and maxX from the UI (maybe use scroll weel) (zoom in and out)
- Use actual units in the axis
- Add axis labels (Progress vs Time)
- Add the title Easy Easings .com somewhere
- Feedback button
- Show popup warning about unsaved changes before leaving

## Bugs
- Too slow on some laptops

### Marketing

- Nice readme
- share on
  - reddit (help from friend)
  - https://www.producthunt.com/
  - http://easings.net/

## Mid-term

- SEO
- Undo/redo feature
- Presets (bounce, elastic...)
- Save work in local storage
- Dark theme
- Optimize app fps
- Get 100 stars to use open collective

## Future considerations

- Labels on axis for selected points
- Vector based curve and then calculate most optimal points
- Site usable keyboard-only
- Add sounds
- Parse css and create the graph
- If the graph can be a cubic bezier, sugest it.
- Tap <kbd>S</kbd> key to enable symetry mode, when one point is added to a side, it appears on the other as well. Would be nice to be able to move the simetry axis.
- This proposal https://github.com/w3c/csswg-drafts/pull/6533
  - When first or last point are not 0 or 100, the line should continue. The animation also do that behavior. 
  - Also, the delays must work. 
  - And add e2e tests.

## Migration to vue
- [ ] Serviceworker ("there's an update" popup)
- [ ] Pinia example file and setup is there,change vuex to pinia
- [ ] Remove usages of defineComponent() and use script setup instead
    - Delete the shims file after that 
- [ ] Fix event type (there's a todo)
