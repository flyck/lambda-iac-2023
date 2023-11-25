// handler.ts
var handler_default = {
  async hello(event: any) {
    console.log('Hello from Bun! local');
    return new Response(
      JSON.stringify({
        body: {
          handlerTs: Date.now()
        }
      })
    );
  },
};
export { handler_default as default };
