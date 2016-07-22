import React, { Component } from 'react';
import Immutable from 'immutable';
import Welcome from './welcome';
import Note from './note';
import NewNoteBar from './newnotebar';

// ordered map could help for keeping notes in order

// example class based component (smart component)
class App extends Component {

  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
      selectedNote: null,
      updatezIndex: 0,
    };

    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  addNote(name) {
    const newNote =
      {
        title: name,
        text: '# write here!',
        x: 400,
        y: 12,
        zIndex: 0,
      };
    const id = Math.random().toString();
    this.setState({
      notes: this.state.notes.set(id, newNote),
    });
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  editNote(id, note) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, note); }),
      updatezIndex: this.state.updatezIndex + 1,
    });
  }

// http://webdesign.tutsplus.com/tutorials/css-experiments-with-a-search-form-input-and-button--cms-22069
  render() {
    return (
      <div className="main">
        <Welcome />
        <NewNoteBar id="newnotebar" addNote={this.addNote} onSearchChange={text => this.addNote(text)} />
        <br></br>
        <div>
          {this.state.notes.entrySeq().map(([id, note]) => < Note key={id} id={id} note={note} updatezIndex={this.state.updatezIndex} editNote={this.editNote} deleteNote={this.deleteNote} />)}
        </div>
      </div>
    );
  }
}

export default App;
