import Block from '../components/Block.svelte';

export default {
  title: 'Block',
  component: Block,
  argTypes: {
    index: { control: 'number' },
    content: { control: 'text' },
  },
};

const Template = ({ ...args }) => ({
  Component: Block,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  index: 0,
  content: 'Stuff and things',
};
