import type { AppConfig } from "./utils/config";
import { OpenAIApi, Configuration } from "@azure/openai"; // P6058

import { SinglePassApp } from "./components/singlepass-cli-app";
import { render } from "ink";
import React from "react";

export async function runSinglePass({
  originalPrompt,
  config,
  rootPath,
}: {
  originalPrompt?: string;
  config: AppConfig;
  rootPath: string;
}): Promise<void> {
  const openAiApi = new OpenAIApi(
    new Configuration({
      apiKey: config.apiKey,
      azure: {
        apiKey: process.env["AZURE_OPENAI_API_KEY"],
        endpoint: process.env["AZURE_OPENAI_ENDPOINT"],
      },
    })
  ); // P1fc9

  return new Promise((resolve) => {
    render(
      <SinglePassApp
        originalPrompt={originalPrompt}
        config={config}
        rootPath={rootPath}
        onExit={() => resolve()}
      />,
    );
  });
}

export default {};
