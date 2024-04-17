/* eslint-disable no-undef */
import axios from "axios";
import { fetchResource, createResource, updateResource } from "../utils/api.js";

// Mocking axios
jest.mock("axios");

describe("api.js", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const API_URL = "http://localhost:8000/resource";

  // Test for fetching resources
  describe("fetchResource", () => {
    it("should fetch a resource", async () => {
      const mockData = { id: 1, name: "Resource" };
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await fetchResource("resource");
      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith(API_URL);
    });

    it("should throw an error when fetching fails", async () => {
      axios.get.mockRejectedValueOnce(new Error("Failed to fetch"));

      await expect(fetchResource("resource")).rejects.toThrow(
        "Failed to fetch"
      );
    });
  });

  // Test for creating resources
  describe("createResource", () => {
    it("should create a resource", async () => {
      const mockData = { id: 1, name: "Resource" };
      const postData = { name: "Resource" };
      axios.post.mockResolvedValueOnce({ data: mockData });

      const result = await createResource("resource", postData);
      expect(result).toEqual(mockData);
      expect(axios.post).toHaveBeenCalledWith(API_URL, postData);
    });

    it("should throw an error when creation fails", async () => {
      const postData = { name: "Resource" };
      axios.post.mockRejectedValueOnce(new Error("Failed to create"));

      await expect(createResource("resource", postData)).rejects.toThrow(
        "Failed to create"
      );
    });
  });

  // Test for Updating resources
  describe("updateResource", () => {
    it("should update a resource", async () => {
      const mockData = { id: 1, name: "Updated Resource" };
      const putData = { id: 1, name: "Updated Resource" };
      axios.put.mockResolvedValueOnce({ data: mockData });

      const result = await updateResource("resource", putData);
      expect(result).toEqual(mockData);
      expect(axios.put).toHaveBeenCalledWith(API_URL, putData);
    });

    it("should throw an error when update fails", async () => {
      const putData = { id: 1, name: "Updated Resource" };
      axios.put.mockRejectedValueOnce(new Error("Failed to update"));

      await expect(updateResource("resource", putData)).rejects.toThrow(
        "Failed to update"
      );
    });
  });
});
