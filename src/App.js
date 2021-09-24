import React from 'react';
import './style.css';

export default function App() {
  const model = [
    {
      Timestamp: 'Tue Aug 24 2021 12:17',
      Type: 'General',
      Sender: 'Berkay Akbaş',
      Content: 'test',
      Name: 'Berkay Akbaş',
      ID: 7,
    },
  ];

  class Message extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showDropdown: false,
        clickEdit: false,
        message: this.props.contentText,
      };
      this.contentRef = React.createRef();
      this.showDropdown = this.showDropdown.bind(this);
      this.closeDropdown = this.closeDropdown.bind(this);
      this.makeEditable = this.makeEditable.bind(this);
      this.cancelEditable = this.cancelEditable.bind(this);
      this.onClickDone = this.onClickDone.bind(this);
    }

    showDropdown() {
      this.setState({ showDropdown: !this.state.showDropdown });
    }
    closeDropdown() {
      this.setState({ showDropdown: false });
    }
    makeEditable() {
      this.setState({ clickEdit: true });
      this.closeDropdown();
    }
    cancelEditable() {
      this.setState({ clickEdit: false });
      this.contentRef.current.innerHTML = this.props.contentText;
    }
    onClickDone() {
      this.setState({ clickEdit: false });
    }

    render() {
      console.log(this.state.message);
      var content = this.props.contentText;

      var name = (
        <a
          href={
            'https://kunduz.retool.com/apps/Support/Teacher%20Details#teacher_id=' +
            this.props.message_id
          }
          target="_blank"
        >
          <div
            class="text-sm font-semibold hover:underline"
            style={{ color: '#00A396' }}
          >
            {' '}
            {this.props.name}{' '}
          </div>
        </a>
      );
      var image_src =
        'https://via.placeholder.com/64/00A396/FFFFFF?text=' +
        this.props.sender[0];

      var time = this.props.time;
      return (
        <div class="flex flex-row">
          <div
            class={
              'flex flex-col bg-gray-200 rounded-xl w-2/3 my-4 ml-20 self-start'
            }
          >
            <div class="flex flex-row justify-between m-2">
              <div class="text-sm font-semibold"> {name} </div>
              <div class="text-xs text-gray-700"> {time} </div>
            </div>
            <img
              class={
                'w-12 h-12 bg-gray-200 rounded-full -mx-16 relative -top-9 self-start'
              }
              src={image_src}
              alt="User Avatar"
            />

            <hr class="border-1 -mt-12 border-gray-300" />
            <div
              class={
                this.state.clickEdit
                  ? 'flex flex-col bg-gray-100'
                  : 'flex flex-col'
              }
            >
              <div
                class={
                  this.state.clickEdit
                    ? 'flex justify-between mx-4 my-1'
                    : 'flex justify-between mx-4 my-1 hidden'
                }
              >
                <button
                  onClick={this.cancelEditable}
                  class="text-sm text-red-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={this.onClickDone}
                  class="text-sm text-green-700 font-semibold"
                >
                  Done
                </button>
              </div>
              <hr class="border-1 border-gray-200" />
              <p
                ref={this.contentRef}
                key={this.props.message_id}
                contenteditable={this.state.clickEdit ? 'true' : 'false'}
                class={
                  this.state.clickEdit
                    ? 'p-4 text-sm outline-none'
                    : 'p-4 text-sm'
                }
                onInput={() =>
                  this.setState({ message: this.contentRef.current.innerHTML })
                }
              >
                {content}
              </p>
            </div>
          </div>
          <div class="p-4">
            <svg
              onClick={this.showDropdown}
              class="text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-all cursor-pointer"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                clip-rule="evenodd"
              />
            </svg>
            {this.state.showDropdown ? (
              <Dropdown
                closeDropdown={this.closeDropdown}
                makeEditable={this.makeEditable}
              />
            ) : null}
          </div>
        </div>
      );
    }
  }

  class Footer extends React.Component {
    constructor(props) {
      super(props);
      this.textInput = React.createRef();
      this.resetTextInput = this.resetTextInput.bind(this);
    }

    resetTextInput() {
      this.textInput.current.value = '';
    }

    render() {
      return (
        <div style={{ height: '72px' }}>
          <div
            class="flex flex-row bg-gray-100 w-full justify-between items-center"
            style={{
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
              height: '72px',
            }}
          >
            <span class="ml-4">
              <svg
                class="text-gray-500 cursor-pointer hover:text-gray-700"
                stroke="currentColor"
                fill="none"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="2em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <input
              class="mr-4 bg-gray-100 outline-none"
              ref={this.textInput}
              placeholder="Type your messages..."
            />
            <span
              onClick={this.resetTextInput}
              class="font-semibold text-blue-500 cursor-pointer hover:text-blue-700 mr-4"
            >
              Send
            </span>
          </div>
        </div>
      );
    }
  }

  class Dropdown extends React.Component {
    render() {
      return (
        <div class="relative">
          <div class="relative bg-gray-100 p-2 rounded-lg text-sm z-40">
            <button
              onClick={this.props.makeEditable}
              class="hover:bg-gray-300 w-full rounded-lg z-40"
            >
              Edit
            </button>
            <hr class="border-1 border-gray-300 z-40" />
            <button class="text-red-600 hover:bg-gray-300 w-full rounded-lg z-40">
              Delete
            </button>
          </div>
          <div class="z-30">
            <div class="fixed inset-0" onClick={this.props.closeDropdown} />{' '}
          </div>
        </div>
      );
    }
  }

  class Main extends React.Component {
    constructor(props) {
      super(props);
      this.message = React.createRef();
      this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    scrollToBottom() {
      this.forceUpdate();
      this.message.current.scrollTop = this.message.current.scrollHeight;
    }

    render() {
      return (
        <div
          class="flex flex-col bg-gray-300 mx-auto shadow-lg"
          style={{
            borderRadius: '10px',
            maxWidth: '30rem',
            minWidth: '22rem',
            height: '36rem',
          }}
        >
          <div
            class="flex justify-center"
            style={{
              borderRadius: '10px 10px 0 0',
              backgroundColor: '#00A396',
            }}
          >
            <span class="py-6 font-bold text-gray-200 text-sm hover:underline">
              <a
                href={
                  'https://kunduz.retool.com/apps/Support/Question%20Details#question_id=' +
                  model[0].Q_ID
                }
                target="_blank"
              >
                Teacher Internal Notes
              </a>
            </span>
          </div>

          <div
            class="flex flex-col overflow-scroll overflow overflow-x-hidden pt-4 h-full"
            ref={this.message}
          >
            {model.map((m) => {
              return (
                <Message
                  contentText={m.Content}
                  sender={m.Sender}
                  time={m.Timestamp}
                  contentTextType={m.Type}
                  name={m.Name}
                  message_id={m.ID}
                  brand_color={m.BrandColor}
                />
              );
            })}
          </div>

          <Footer />
        </div>
      );
    }
  }

  return <Main />;
}
