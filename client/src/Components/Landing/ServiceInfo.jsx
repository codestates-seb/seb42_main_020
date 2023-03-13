import {
  SServiceInfoLayout,
  SServiceInfoSection,
  SIntroduceImg1,
  SIntroduceImg2,
  SIntroduceImg3,
  STextIntroduceSection,
  STextTitle,
  STextSub,
} from '../../Style/ServiceInfoStyle';

const ServiceInfo = () => {
  return (
    <SServiceInfoLayout>
      <SServiceInfoSection>
        <SIntroduceImg1 />
        <STextIntroduceSection>
          <STextTitle>
            자유롭고 전문적인
            <br /> 질문 커뮤니티
          </STextTitle>
          <STextSub>
            나와 같은 고민을 하는 회원과 소통해 보세요.
            <br /> 의료 전문인의 답변은 별도 표시됩니다.
          </STextSub>
        </STextIntroduceSection>
      </SServiceInfoSection>
      <SServiceInfoSection>
        <STextIntroduceSection>
          <STextTitle>내가 찾는 지역의 병원</STextTitle>
          <STextSub>
            빠르고 쉽게 찾는 지역의 병원 리뷰를 모아보세요.
            <br /> 리뷰 확인과 동시에 병원 위치 확인이 가능합니다.
          </STextSub>
        </STextIntroduceSection>
        <SIntroduceImg2 />
      </SServiceInfoSection>
      <SServiceInfoSection>
        <SIntroduceImg3 />
        <STextIntroduceSection>
          <STextTitle>실 방문자들이 남기는 병원 리뷰</STextTitle>
          <STextSub>
            진료 내역을 인증한 실 방문자들의 리뷰만 등록합니다.
            <br /> 가 본 사람들의 꿀팁이 가득한 리뷰를 만나보세요.
          </STextSub>
        </STextIntroduceSection>
      </SServiceInfoSection>
    </SServiceInfoLayout>
  );
};

export default ServiceInfo;
