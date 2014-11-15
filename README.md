# Next 

Next作为一个工具，主要是解决开发中工作流程。而且涉及了mysql、redis、java、tomcat、node、nginx带来的集成问题。如何屏蔽开发与部署带来的差异。以及自动化构建及持续集成（CI）等。

### 涉及的项目

- [docker](https://github.com/docker/docker)
- [fig](https://github.com/docker/fig)
- [jenkins](https://github.com/jenkinsci/jenkins)
- [sonar](https://github.com/SonarSource/sonarqube)
- [phabricator](https://github.com/phacility/phabricator)

### 背景

作为一个团队，必然需要工程化开发。而开发中涉及的工程化工具不少，通常有不少是开源的。最简单来说代码托管相关的就涉及不少问题(如：代码review)。然后代码提交之后需要进行持续集成，质量管理，测试相关工作，完成之后还需要进行部署上线。总之，是一套不少工作的流程。

开源项目推荐使用[Github](https://github.com/)来完成，但是[Github](https://github.com/)针对私有项目却是收费的，如果对于不想自己维护这样的工作，使用[Github](https://github.com/)是个不错的方式了。

### 结构说明

