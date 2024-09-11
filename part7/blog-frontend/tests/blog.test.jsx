import { render, screen } from "@testing-library/react";
import { expect, describe, beforeEach, after } from "vitest";
import userEvent from "@testing-library/user-event";
import BlogForm from "../src/components/BlogForm";
import Blog from "../src/components/Blog";
import Togglable from "../src/components/Togglable";

describe(`test for blogs`, () => {
  test.only(`new blog form check, that the form calls the event handler
  it received as props with the right details when a new blog is created.`, async () => {
    const user = userEvent.setup();
    const mockTrackSubmit = vi.fn();

    render(<BlogForm inSubmit={mockTrackSubmit} />);

    const [titleInput, authorInput, urlInput] = screen.getAllByRole("textbox");
    const submitBtn = screen.getByText("Create");

    user.type(titleInput, "title test");
    user.type(authorInput, "author test");
    user.type(urlInput, "url test");
    await user.click(submitBtn);

    console.log(mockTrackSubmit.mock.calls);

    expect(mockTrackSubmit.mock.calls[0][0].title).toBe("title test");
    expect(mockTrackSubmit.mock.calls[0][0].author).toBe("author test");
    expect(mockTrackSubmit.mock.calls[0][0].url).toBe("url test");
  });

  test(`ensures that if the like button is clicked twice, 
  the event handler the component received as props is called twice.`, async () => {
    const user = userEvent.setup();
    const mockTrackLike = vi.fn();

    const mockBlog = {
      author: "John Doe",
      title: "Testing React Components",
      url: "https://example.com",
      likes: 5,
      user: {
        name: "Jane Doe",
        username: "janedoe",
      },
    };

    render(<Blog blog={mockBlog} onLike={mockTrackLike} />);

    const likeBtn = screen.getByText("like");
    await user.dblClick(likeBtn);

    expect(mockTrackLike.mock.calls).toHaveLength(2);
  });

  test(`checks that the blog's URL and number of likes are shown when the button 
  controlling the shown details has been clicked`, async () => {
    render(
      <Togglable buttonHideLabel="hide" buttonShowLabel="show-btn">
        <div>
          <p className="url">https://example.com</p>
          <p className="likes">1</p>
        </div>
      </Togglable>,
    );

    const user = userEvent.setup();
    const button = await screen.findByText("show-btn");
    await user.click(button);

    const urlEl = screen.getByText("https://example.com");
    const likesEl = screen.getByText("1");

    expect(urlEl).toBeDefined();
    expect(likesEl).toBeDefined();
  });

  test(`checks that the component displaying a blog renders the blog's title and author, 
  but does not render its URL or number of likes by default`, () => {
    const mockBlog = {
      author: "John Doe",
      title: "Testing React Components",
      url: "https://example.com",
      likes: 5,
      user: {
        name: "Jane Doe",
        username: "janedoe",
      },
    };

    render(<Blog blog={mockBlog} />);

    const authorEl = screen.queryByText(mockBlog.author);
    const titleEl = screen.queryByText(mockBlog.title);

    expect(authorEl).toBeDefined();
    expect(titleEl).toBeDefined();
  });
});
