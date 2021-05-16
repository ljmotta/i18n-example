import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { RestaurantList } from '@app/RestaurantList/RestaurantList';

const stories = storiesOf('Components', module);
stories.addDecorator(withInfo);
stories.add(
  'RestaurantList',
  () => <RestaurantList />,
  { info: { inline: true } }
);
