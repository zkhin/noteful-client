import React from "react";
import NotefulContext from "../NotefulContext";

class AddNote extends React.Component {
  static contextType = NotefulContext;

  state = {
    newNoteName: {
      touched: false,
      name: null
    },
    newNoteContent: {
      touched: false,
      content: null
    },
    selectedFolder: null
  };

  validateNoteName() {
    if (!this.state.newNoteName.name && this.state.newNoteName.touched) {
      return "New Note Must Have a Name";
    }
  }
  validateNoteContent() {
    if (
      !this.state.newNoteContent.content &&
      this.state.newNoteContent.touched
    ) {
      return "Note Must Have Content";
    }
  }
  setNoteName(value) {
    this.setState({
      newNoteName: {
        name: value,
        touched: true
      }
    });
  }
  setNoteContent(value) {
    this.setState({
      newNoteContent: {
        content: value,
        touched: true
      }
    });
  }

  handleChange(e) {
    this.setState({ selectedFolder: e.target.value });
  }

  handleAddNoteClick = e => {
    e.preventDefault();
    this.context.addNote(
      this.state.newNoteName.name,
      this.state.newNoteContent.content,
      this.state.selectedFolder
    );
  };

  render() {
    return (
      <form>
        <label>Pick a Folder</label>
        <select onChange={e => this.handleChange(e)} required>
          <option>Pick a Folder</option>
          {this.context.folders.length > 0 &&
            this.context.folders.map(folder => {
              return (
                <option name={folder.name} key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              );
            })}
        </select>
        <div>
          <label htmlFor="newNoteName">
            Note Title
            <p className="error"> {this.validateNoteName()}</p>
          </label>
          <input
            id="newNoteName"
            name="newNoteName"
            type="text"
            required
            onChange={e => this.setNoteName(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="newNoteContent">
            Write New Note
            <p className="error"> {this.validateNoteContent()}</p>
          </label>
          <textarea
            id="newNoteContent"
            name="newNoteContent"
            rows="15"
            required
            onChange={e => this.setNoteContent(e.target.value)}
          ></textarea>
        </div>

        <button
          type="button"
          disabled={
            !this.state.selectedFolder ||
            this.validateNoteContent() ||
            this.validateNoteName()
          }
          onClick={this.handleAddNoteClick}
        >
          Add New Note
        </button>
        <button type="reset" onClick={() => this.context.stopAdding()}>
          Cancel
        </button>
      </form>
    );
  }
}

export default AddNote;
