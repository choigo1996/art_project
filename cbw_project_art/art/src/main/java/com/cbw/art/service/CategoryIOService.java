package com.cbw.art.service;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.cbw.art.model.Category;
import com.cbw.art.repository.CategoryRepository;
import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@Service
public class CategoryIOService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Value("classpath:category.json")
	private Resource jsonFile;
	
	@PostConstruct
	public void initialize() {
		processJsonData(jsonFile);
	}
	
	 @Transactional
	    public void processJsonData(Resource fileResource) {
	        try {
	            InputStream inputStream = fileResource.getInputStream();
	            
	            if (categoryRepository.count() == 0) {
	            	List<Category> dataList = readJsonData(inputStream);
	            	categoryRepository.saveAll(dataList);
	            } else {
	                System.out.println("테이블에 데이터가 있을 경우 저장하지 않습니다");
	            }

	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }
	 private List<Category> readJsonData(InputStream inputStream) throws IOException {
	        List<Category> dataList = new ArrayList();

	        try (JsonReader jsonReader = new JsonReader(new InputStreamReader(inputStream))) {
	            jsonReader.beginArray();

	            while (jsonReader.hasNext()) {
	            	Category data = new Gson().fromJson(jsonReader, Category.class);
	                dataList.add(data);
	            }

	            jsonReader.endArray();
	        }

	        return dataList;
	    }
}
