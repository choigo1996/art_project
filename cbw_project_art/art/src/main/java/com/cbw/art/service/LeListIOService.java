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

import com.cbw.art.model.LectureList;
import com.cbw.art.repository.LectureListRepository;
import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@Service
public class LeListIOService {
	
	@Autowired
	private LectureListRepository lectureListRepository;
	
	@Value("classpath:lecturelist.json")
	private Resource jsonFile;
	
	@PostConstruct
    public void initialize() {
		System.out.println("Initializing leListIOService...");
        processJsonData(jsonFile);
    }
	
	@Transactional
    public void processJsonData(Resource fileResource) {
        try {
            InputStream inputStream = fileResource.getInputStream();
            
            if (lectureListRepository.count() == 0) {
            	List<LectureList> dataList = readJsonData(inputStream);
            	lectureListRepository.saveAll(dataList);
            } else {
                System.out.println("테이블에 데이터가 있을 경우 저장하지 않습니다");
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
	
	private List<LectureList> readJsonData(InputStream inputStream) throws IOException {
        List<LectureList> dataList = new ArrayList();
        try (JsonReader jsonReader = new JsonReader(new InputStreamReader(inputStream))) {
            jsonReader.beginArray();

            while (jsonReader.hasNext()) {
            	LectureList data = new Gson().fromJson(jsonReader, LectureList.class);
                dataList.add(data);
            }

            jsonReader.endArray();
        }

        return dataList;
    }
}
