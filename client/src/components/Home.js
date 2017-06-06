import React from 'react';

export default function Home() {
  return (
    <div>
      <h1>App Name</h1>
      <div>graphic placeholder</div>

      <h3>some sort of tagline</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat ultrices scelerisque. Proin consectetur, elit quis ultrices tempus, sem lorem finibus mi, nec finibus magna risus sit amet leo. Mauris a accumsan odio. Duis euismod sollicitudin nisi, in finibus mi mollis quis. Nam mattis urna sed neque sagittis, sit amet tempor tellus tincidunt. Sed maximus vitae massa dignissim imperdiet. Cras aliquam, urna non convallis euismod, quam velit dictum leo, at interdum arcu odio quis orci. Donec lorem ex, eleifend a molestie non, posuere et felis. Vivamus rhoncus erat ac mauris finibus, nec rhoncus turpis euismod. Donec id neque leo. Aenean eu rhoncus massa, at vehicula orci. Cras gravida mauris nisl, ornare eleifend nunc imperdiet at. Suspendisse potenti. Cras mi dui, condimentum eget diam quis, molestie commodo quam. Aenean in rhoncus lorem. Nunc cursus fermentum enim, non varius quam.</p>
      <div>
        <h3>Sign up:</h3>
        <form>
          <input type="text" placeholder="first name" required />
          <br />
          <input type="text" placeholder="last name" required />
          <br />
          <input type="text" placeholder="email" required />
          <br />
          <input type="text" placeholder="password" required />
          <br />
          <button>submit</button>
        </form>
      </div>
    </div>
  );
}
